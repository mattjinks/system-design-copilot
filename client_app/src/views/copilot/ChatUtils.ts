import { useCallback, useRef, useState } from "react";
import { ChatKey, Message } from "../../state/types";
import { SystemDesignState } from "../../state/FlowStateContext";

export const useAddGPTMessage = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (chatKey: ChatKey, id: number, text: string) => {
      console.log("Add GPT message", text);

      setSystemDesignState((prevState: SystemDesignState) => {
        const newMessage: Message = { id: id, role: "copilot", text: text };

        const currMessages = prevState.chats.get(chatKey) || [];

        const updatedMessages = [...currMessages, newMessage];

        const updatedChats = new Map(prevState.chats);
        updatedChats.set(chatKey, updatedMessages);

        console.log(prevState.chats.get(chatKey));
        console.log(updatedChats.get(chatKey));

        return {
          ...prevState,
          chats: updatedChats,
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateGPTMessage = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (chatKey: ChatKey, id: number, newText: string) => {
      console.log("Update Copilot Message", newText);

      setSystemDesignState((prevState: SystemDesignState) => {
        const messages = prevState.chats.get(chatKey) || [];
        console.log("messages", messages);
        const updatedMessages = messages.map((msg) =>
          msg.id === id ? { ...msg, text: msg.text + newText } : msg
        );
        console.log("udpdated messages", updatedMessages);
        const updatedChats = new Map(prevState.chats);
        updatedChats.set(chatKey, updatedMessages);

        return {
          ...prevState,
          chats: updatedChats,
        };
      });
    },
    [setSystemDesignState]
  );

export const useGenerateMessageId = (systemDesignState: SystemDesignState) =>
  useCallback(
    (chatKey: ChatKey) => {
      console.log("Generate Message Id");
      const messages = systemDesignState.chats.get(chatKey) || [];
      let id = messages.length;
      while (messages.some((msg) => msg.id === id)) {
        id++;
      }
      return id;
    },
    [systemDesignState]
  );

export const useAddUserMessage = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>,
  generateMessageId: (chatKey: ChatKey) => number
) =>
  useCallback(
    (chatKey: ChatKey, text: string) => {
      console.log("Add User Message", text);

      if (text.trim()) {
        setSystemDesignState((prevState: SystemDesignState) => {
          const newMessage: Message = {
            id: generateMessageId(chatKey),
            role: "user",
            text: text,
          };

          const messages = prevState.chats.get(chatKey) || [];
          const updatedMessages = [...messages, newMessage];

          const updatedChats = new Map(prevState.chats);
          updatedChats.set(chatKey, updatedMessages);

          return {
            ...prevState,
            chats: updatedChats,
          };
        });
      }
    },
    [setSystemDesignState, generateMessageId]
  );

export const useGetCopilotMessage = (systemDesignState: SystemDesignState) => {
  return useCallback(
    (chatKey: ChatKey, id: number) => {
      console.log("Get Copilot Message");
      const messages = systemDesignState.chats.get(chatKey) || [];
      return messages.find((msg) => msg.id === id);
    },
    [systemDesignState]
  );
};

export function ChatUtils() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [currentGPTResponse, setCurrentGPTResponse] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function addCopilotMessage(id: number, text: string) {
    console.log("Add Copilot message");
    const newMessage: Message = { id: id, role: "copilot", text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log("Chat Utils Messages length: ", messages.length);
    if (inputRef.current) inputRef.current.style.height = "auto";
  }

  function getCopilotMessage(id: number) {
    const msg = messages.find((msg) => msg.id === id);
    return msg;
  }

  function updateCopilotMessage(id: number, newText: string) {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, text: newText } : msg
      )
    );
  }

  function generateMessageId() {
    let id = messages.length;
    while (messages.some((msg) => msg.id === id)) {
      id++;
    }
    return id;
  }

  function addUserMessage(text: string) {
    console.log("add user message");
    if (text.trim()) {
      const newMessage: Message = {
        id: generateMessageId(),
        role: "user",
        text,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
      if (inputRef.current) inputRef.current.style.height = "auto";
    }
    console.log("Chat Utils Messages length: ", messages.length);
  }

  return {
    messages,
    setMessages,
    input,
    setInput,
    currentGPTResponse,
    setCurrentGPTResponse,
    inputRef,
    addUserMessage,
    addCopilotMessage,
    getCopilotMessage,
    updateCopilotMessage,
    generateMessageId,
  };
}
