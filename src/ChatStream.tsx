import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useSystemDesignState } from "./state/FlowStateContext";
import { Button, Form } from "react-bootstrap";
import SendIcon from '@mui/icons-material/Send';
import './views/copilot/Copilot.css'
import CopilotService from "./CopilotService";
import { ChatKey } from "./state/types";

export default function ChatStream({ chatKey }: { chatKey: ChatKey }) {

  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null); // Ref to access the textarea element
  const messages = systemDesignState.chats.get(chatKey);
  let title = "";
  
  if (chatKey === 'description') {
    title = "Description Chat";
  } else if (chatKey === 'requirements') {
    title = "Requirements Chat";
  } else if (chatKey === 'scaleEstimates') {
    title = "Scale Estimates Chat";
  } else if (chatKey === 'apis') {
    title = "APIs Chat";
  } else if (chatKey === 'dbSchema') {
    title = "Database Schema Chat";
  } else if (chatKey === 'diagram') {
    title = "Diagram Chat";
  } else if (chatKey === 'extra') {
    title = "Extra Notes Chat"
  }

  const copilotService = CopilotService();

  // copilotService.getModelFeedback(chatKey);

  const handleUserMessage = () => {
    console.log("Handle User Message");
    console.log("messages.length: ", messages!.length);
    console.log("system messages.length: ", systemDesignState.chats.get(chatKey));
    console.log("input", input);
    setInput("");
    copilotService.sendUserMessage(chatKey, input);
  }

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto"; // Reset height so the scrollHeight is recalculated
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust the height to the scroll height
  };

  return (
    <div className="chat-container">
      <p style={{ fontSize: "14px", color: "#007bff" }}>{title}</p>
      <div className="chat-messages">
        {messages!.map((msg, index) => (
          <div
            key={index}
            className="msg"
          >
            {msg.role === "copilot" ? (
              <div className="markdown-content" style={{ fontSize: "12px" }}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ) : (
              <div className="user-message">{msg.text}</div>
            )}
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <Form.Control
          as="textarea"
          className="chat-input"
          rows={1}
          style={{ resize: "none", overflow: "hidden" }}
          placeholder="Message GPT"
          value={input}
          ref={inputRef} // Attach the ref to the textarea
          onChange={(e) => setInput(e.target.value)}
          onInput={handleTextareaResize}
        />
        <Button 
          className="send-button" 
          onClick={handleUserMessage}
          style={{ height: '38px' }}
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}