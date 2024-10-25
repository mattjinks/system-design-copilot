import { useSystemDesignState, SystemDesignStateProvider } from "./state/FlowStateContext";
import './state/types'
import Description from "./views/description/Description"; 
import { useAddFunctionalRequirementsHandler, useUpdateFeedbackHandler } from "./state/FlowStateHooks";
import ExtraConsiderations from "./views/extra_considerations/ExtraConsiderations";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ChatUtils, useAddGPTMessage, useAddUserMessage, useGenerateMessageId, useGetCopilotMessage, useUpdateGPTMessage } from "./views/copilot/ChatUtils";
import { ChatKey } from "./state/types";
import PayloadService from "./views/copilot/PayloadService";

export default function CopilotService() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const generateMessageId = useGenerateMessageId(systemDesignState);
  const addUserMessage = useAddUserMessage(setSystemDesignState, generateMessageId);
  const addGPTMessage = useAddGPTMessage(setSystemDesignState);
  const updateGPTMessage = useUpdateGPTMessage(setSystemDesignState);
  const getCopilotMessage = useGetCopilotMessage(systemDesignState);

  const payloadService = PayloadService();

  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    let existingSessionId = localStorage.getItem('sessionId');
    if (!existingSessionId) {
      existingSessionId = uuidv4();
      localStorage.setItem('sessionId', existingSessionId!);
    }
    setSessionId(existingSessionId!);
  }, [])

  const sendUserMessage = async(chatKey: ChatKey, msg: string) => {
    console.log('Send Chat Msg Key', chatKey);
    console.log('Send Chat Msg', msg);
    console.log('sessionId', sessionId);

    const payload = JSON.stringify({
      "userMessage": msg
    });

    const response = await fetch(`http://localhost:8080/chat-stream?sessionId=${sessionId}&chatKey=${chatKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    addUserMessage(chatKey, msg);

    const gptMessageId = generateMessageId(chatKey) + 1;

    addGPTMessage(chatKey, gptMessageId, "");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      console.log('chunk:' + chunk + ':' + chunk.length);
      updateGPTMessage(
        chatKey,
        gptMessageId, 
        getCopilotMessage(chatKey, gptMessageId) ? getCopilotMessage(chatKey, gptMessageId) + chunk : chunk
      );
    }

    console.log('Copilot Service messages length: ', systemDesignState.chats);
  }

  const getModelFeedback = async(chatKey: ChatKey) => {
    //console.log('Send Chat Msg Key', chatKey);
    console.log('Get Model Feedback');
    // console.log('sessionId', sessionId);

    let payload;

    if (chatKey === 'description') {
      payload = JSON.stringify(payloadService.descriptionPayload());
    } else if (chatKey === 'requirements') {
      payload = JSON.stringify(payloadService.requirementsPayload());
    } else if (chatKey === 'scaleEstimates') {
      payload = JSON.stringify(payloadService.scaleEstimatesPayload());
    } else if (chatKey === 'apis') {
      payload = JSON.stringify(payloadService.systemAPIsPayload());
    } else if (chatKey === 'dbSchema') {
      payload = JSON.stringify(payloadService.dbSchemaPayload());
    } else if (chatKey === 'diagram') {
      payload = JSON.stringify(payloadService.diagramPayload());
    } else if (chatKey === 'extra') {
      payload = JSON.stringify(payloadService.extraConsiderationsPayload());
    } else if (chatKey === 'overall') {
      payload = JSON.stringify(payloadService.fullSystemPayload());
    } else {
      console.error("Invalid chatKey", chatKey);
    }

    const response = await fetch(`http://localhost:8080/chat-stream?sessionId=${sessionId}&chatKey=${chatKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    const gptMessageId = generateMessageId(chatKey) + 1;

    addGPTMessage(chatKey, gptMessageId, "");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      console.log('chunk:' + chunk + ':' + chunk.length);
      updateGPTMessage(
        chatKey,
        gptMessageId, 
        getCopilotMessage(chatKey, gptMessageId) ? getCopilotMessage(chatKey, gptMessageId) + chunk : chunk
      );
    }
  }

  return {
    getModelFeedback,
    sendUserMessage,
  };
}
