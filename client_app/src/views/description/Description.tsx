/* eslint-disable no-constant-condition */
import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Description.css";
import ReactMarkdown from 'react-markdown';
import { useSystemDesignState } from "../../state/FlowStateContext";
import { useUpdateDescriptionHandler, useClearFeedbackHandler } from "../../state/FlowStateHooks";
import Copilot from "../copilot/Copilot";
import CopilotService from "../../CopilotService";

export default function Description() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const copilotService = CopilotService();

  const [ showCopilot, setShowCopilot ] = useState(false);

  const placeholderText = `"I'm designing a video sharing service like Youtube, where users will be able to upload/view/search videos"`
  
  const updateDescription = useUpdateDescriptionHandler(setSystemDesignState);
  const updateFeedback = useClearFeedbackHandler(setSystemDesignState);
  const handleTextareaResize = (e) => {
    e.target.style.height = "auto"; // Reset height so the scrollHeight is recalculated
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust the height to the scroll height
  };

  const handleSubmit = () => {
    // copilotService.chatAboutRequirements();
    // copilotService.getModelFeedback("description");
    console.log("Submit Description");
  }

  const printState = () => {
    console.log(systemDesignState);
  }

  const clearFeedback = () => {
    updateFeedback('Clear Feedback');
  }

  const handleShowCopilot = () => {
    // copilotService.chatAboutRequirements();
    console.log("Show Copilot");
    console.log(systemDesignState);
    setShowCopilot(!showCopilot);
    if (systemDesignState.chats.get("description")!.length < 1) {
      copilotService.getModelFeedback("description");
    }
  };

  return (
    <>
      <Container className="description-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              <br />
              <h3 className="header">Describe the system you want to design</h3>
            </Form.Label>
            <br />
            {/* <Form.Label>
              <span style={{ fontStyle: "italic" }}>Example: "I'm designing a video sharing service like Youtube, where users
              will be able to upload/view/search videos"</span>
              <span>
                "I'm designing a video sharing service like Youtube, where users
                will be able to upload/view/search videos"
              </span>
            </Form.Label> */}

            <Col sm="8">
              <Form.Control
                as="textarea"
                rows={5}
                style={{ fontSize: "14px", resize: "none", overflow: "hidden" }} // Ensure the textarea does not manually resize
                placeholder={placeholderText}
                value={systemDesignState.description}
                onInput={handleTextareaResize} // Handle resizing on input
                onChange={(e) => updateDescription(e.target.value)}
              />
            </Col>
          </Form.Group>
          <br></br>
          <Button className="copilot" variant="primary" onClick={handleShowCopilot}>Copilot</Button>
          {/* <Button className="copilot" variant="primary" onClick={handleSubmit}>Copilot</Button>
          <Button className="copilot" variant="danger" onClick={printState}>state</Button>
          <Button className="copilot" variant="primary" onClick={clearFeedback}>clear feedback</Button> */}


        </Form>
      </Container>
      <Copilot chatKey="description" show={showCopilot} handleClose={() => setShowCopilot(false)} />
    </>
  );
}
