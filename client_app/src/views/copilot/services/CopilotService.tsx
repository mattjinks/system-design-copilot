import { useSystemDesignState } from "../../../state/FlowStateContext";
import "../../../state/types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useAddGPTMessage,
  useAddUserMessage,
  useGenerateMessageId,
  useGetCopilotMessage,
  useUpdateGPTMessage,
} from "../ChatUtils";
import { ChatKey } from "../../../state/types";
import PayloadService from "./PayloadService";

export default function CopilotService() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const generateMessageId = useGenerateMessageId(systemDesignState);
  const addUserMessage = useAddUserMessage(
    setSystemDesignState,
    generateMessageId
  );
  const addGPTMessage = useAddGPTMessage(setSystemDesignState);
  const updateGPTMessage = useUpdateGPTMessage(setSystemDesignState);
  const getCopilotMessage = useGetCopilotMessage(systemDesignState);

  const payloadService = PayloadService();

  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    let existingSessionId = localStorage.getItem("sessionId");
    if (!existingSessionId) {
      existingSessionId = uuidv4();
      localStorage.setItem("sessionId", existingSessionId!);
    }
    setSessionId(existingSessionId!);
  }, []);

  const sendUserMessage = async (chatKey: ChatKey, msg: string) => {
    console.log("Send Chat Msg Key", chatKey);
    console.log("Send Chat Msg", msg);
    console.log("sessionId", sessionId);

    const payload = JSON.stringify({
      userMessage: msg,
    });

    const response = await fetch(
      `https://chat-api-service-1001003243492.us-central1.run.app/chat-stream?sessionId=${sessionId}&chatKey=${chatKey}`,
      // `http://localhost:8080/chat-stream?sessionId=${sessionId}&chatKey=${chatKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }
    );

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    addUserMessage(chatKey, msg);

    const gptMessageId = generateMessageId(chatKey) + 1;

    addGPTMessage(chatKey, gptMessageId, "");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      console.log("chunk:" + chunk + ":" + chunk.length);
      updateGPTMessage(
        chatKey,
        gptMessageId,
        getCopilotMessage(chatKey, gptMessageId)
          ? getCopilotMessage(chatKey, gptMessageId) + chunk
          : chunk
      );
    }

    console.log("Copilot Service messages length: ", systemDesignState.chats);
  };

  const getCopilotFeedback = async (chatKey: ChatKey) => {
    console.log("Get Model Feedback", systemDesignState);

    let payload;

    if (chatKey === "description") {
      payload = JSON.stringify(payloadService.descriptionPayload(false));
    } else if (chatKey === "requirements") {
      payload = JSON.stringify(payloadService.requirementsPayload(false));
    } else if (chatKey === "scaleEstimates") {
      payload = JSON.stringify(payloadService.scaleEstimatesPayload(false));
    } else if (chatKey === "apis") {
      payload = JSON.stringify(payloadService.systemAPIsPayload(false));
    } else if (chatKey === "dbSchema") {
      payload = JSON.stringify(payloadService.dbSchemaPayload(false));
    } else if (chatKey === "diagram") {
      payload = JSON.stringify(payloadService.diagramPayload(false));
    } else if (chatKey === "extra") {
      payload = JSON.stringify(
        payloadService.extraConsiderationsPayload(false)
      );
    } else if (chatKey === "overall") {
      payload = JSON.stringify(payloadService.fullSystemPayload(false));
    } else {
      console.error("Invalid chatKey", chatKey);
    }

    console.log("payload: ", payload);

    const response = await fetch(
      `https://chat-api-service-1001003243492.us-central1.run.app/chat-stream?sessionId=${sessionId}&chatKey=${chatKey}`,
      // `http://localhost:8080/chat-stream?sessionId=${sessionId}&chatKey=${chatKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }
    );

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    const gptMessageId = generateMessageId(chatKey) + 1;

    addGPTMessage(chatKey, gptMessageId, "");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      console.log("chunk:" + chunk + ":" + chunk.length);
      updateGPTMessage(
        chatKey,
        gptMessageId,
        getCopilotMessage(chatKey, gptMessageId)
          ? getCopilotMessage(chatKey, gptMessageId) + chunk
          : chunk
      );
    }
  };

  const getUpdatedCopilotFeedback = async (chatKey: ChatKey) => {
    console.log("Get updated Model Feedback", systemDesignState);

    let payload;

    if (chatKey === "description") {
      payload = JSON.stringify(payloadService.descriptionPayload(true));
    } else if (chatKey === "requirements") {
      payload = JSON.stringify(payloadService.requirementsPayload(true));
    } else if (chatKey === "scaleEstimates") {
      payload = JSON.stringify(payloadService.scaleEstimatesPayload(true));
    } else if (chatKey === "apis") {
      payload = JSON.stringify(payloadService.systemAPIsPayload(true));
    } else if (chatKey === "dbSchema") {
      payload = JSON.stringify(payloadService.dbSchemaPayload(true));
    } else if (chatKey === "diagram") {
      payload = JSON.stringify(payloadService.diagramPayload(true));
    } else if (chatKey === "extra") {
      payload = JSON.stringify(payloadService.extraConsiderationsPayload(true));
    } else if (chatKey === "overall") {
      payload = JSON.stringify(payloadService.fullSystemPayload(true));
    } else {
      console.error("Invalid chatKey", chatKey);
    }

    console.log("payload: ", payload);

    const response = await fetch(
      `https://chat-api-service-1001003243492.us-central1.run.app/chat-stream?sessionId=${sessionId}&chatKey=${chatKey}`,
      // `http://localhost:8080/chat-stream?sessionId=${sessionId}&chatKey=${chatKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
        credentials: "include",
      }
    );

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    const gptMessageId = generateMessageId(chatKey) + 1;

    addGPTMessage(chatKey, gptMessageId, "");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      console.log("chunk:" + chunk + ":" + chunk.length);
      updateGPTMessage(
        chatKey,
        gptMessageId,
        getCopilotMessage(chatKey, gptMessageId)
          ? getCopilotMessage(chatKey, gptMessageId) + chunk
          : chunk
      );
    }
  };

  return {
    getCopilotFeedback,
    sendUserMessage,
    getUpdatedCopilotFeedback,
  };
}
