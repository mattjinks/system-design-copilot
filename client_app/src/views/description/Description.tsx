import React, { useState } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import "./Description.css";
import { useSystemDesignState } from "../../state/FlowStateContext";
import { useUpdateDescriptionHandler } from "../../state/FlowStateHooks";
import Copilot from "../copilot/Copilot";
import CopilotService from "../copilot/services/CopilotService";

export default function Description() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const copilotService = CopilotService();

  const [showCopilot, setShowCopilot] = useState(false);

  const placeholderText = `"I'm designing a video sharing service like Youtube, where users will be able to upload/view/search videos"`;

  const updateDescription = useUpdateDescriptionHandler(setSystemDesignState);
  const handleTextareaResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = () => {
    console.log("Submit Description");
  };

  const handleShowCopilot = () => {
    console.log("Show Copilot");
    console.log(systemDesignState);
    setShowCopilot(!showCopilot);
    if (systemDesignState.chats.get("description")!.length < 1) {
      copilotService.getCopilotFeedback("description");
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

            <Col sm="8">
              <Form.Control
                as="textarea"
                rows={5}
                style={{ fontSize: "14px", resize: "none", overflow: "hidden" }}
                placeholder={placeholderText}
                value={systemDesignState.description}
                onInput={handleTextareaResize}
                onChange={(e) => updateDescription(e.target.value)}
              />
            </Col>
          </Form.Group>
          <br></br>
        </Form>
        <div className="copilot-button">
          <Button
            variant="primary"
            style={{ marginRight: "33%" }}
            onClick={handleShowCopilot}
          >
            Copilot
          </Button>
        </div>
      </Container>
      <Copilot
        chatKey="description"
        show={showCopilot}
        handleClose={() => setShowCopilot(false)}
      />
    </>
  );
}
