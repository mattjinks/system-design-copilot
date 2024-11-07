import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useSystemDesignState } from "../../state/FlowStateContext";
import { Button, Form } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import "./Copilot.css";
import CopilotService from "./services/CopilotService";
import { ChatKey } from "../../state/types";

export default function ChatStream({ chatKey }: { chatKey: ChatKey }) {
  const { systemDesignState } = useSystemDesignState();
  const [input, setInput] = useState("");
  const [rowSize, setRowSize] = useState(1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messages = systemDesignState.chats.get(chatKey);
  let title = "";

  const [, forceUpdate] = useState(0);
  const triggerForceUpdate = () => forceUpdate((prev) => prev + 1);

  if (chatKey === "description") {
    title = "Description Chat";
  } else if (chatKey === "requirements") {
    title = "Requirements Chat";
  } else if (chatKey === "scaleEstimates") {
    title = "Scale Estimates Chat";
  } else if (chatKey === "apis") {
    title = "APIs Chat";
  } else if (chatKey === "dbSchema") {
    title = "Database Schema Chat";
  } else if (chatKey === "diagram") {
    title = "Diagram Chat";
  } else if (chatKey === "extra") {
    title = "Extra Notes Chat";
  }

  const copilotService = CopilotService();

  const reevaluate = () => {
    console.log("Reevaluate");
    systemDesignState.chats.set(chatKey, []);
    console.log("Trigger ForceUpdate");
    triggerForceUpdate();
    copilotService.getUpdatedCopilotFeedback(chatKey, "reevaluate");
  };

  const handleUserMessage = () => {
    console.log("Handle User Message");
    console.log("messages.length: ", messages!.length);
    console.log(
      "system messages.length: ",
      systemDesignState.chats.get(chatKey)
    );
    console.log("input", input);
    setInput("");
    setRowSize(1);

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    copilotService.sendUserMessage(chatKey, input);
  };

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="chat-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1%",
        }}
      >
        <p style={{ fontSize: "14px", color: "#007bff", margin: 0 }}>{title}</p>
        <Button
          style={{ fontSize: "10px" }}
          variant="outline-primary"
          onClick={reevaluate}
        >
          RE-EVALUATE
        </Button>
      </div>

      <div className="chat-messages">
        {messages!.map((msg, index) => (
          <div key={index} className="msg">
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
          rows={rowSize}
          style={{ resize: "none", overflow: "hidden" }}
          placeholder="Message GPT"
          value={input}
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
          onInput={handleTextareaResize}
        />
        <Button
          className="send-button"
          onClick={handleUserMessage}
          style={{
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}
