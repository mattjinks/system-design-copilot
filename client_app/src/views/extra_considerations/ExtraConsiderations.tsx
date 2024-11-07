import React, { useState } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import "../description/Description.css";
import { useSystemDesignState } from "../../state/FlowStateContext";
import { useUpdateExtraConsiderationsHandler } from "../../state/FlowStateHooks";
import Copilot from "../copilot/Copilot";
import CopilotService from "../copilot/services/CopilotService";

export default function ExtraConsiderations() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const copilotService = CopilotService();

  const [showCopilot, setShowCopilot] = useState(false);

  const updateExtraConsiderations =
    useUpdateExtraConsiderationsHandler(setSystemDesignState);

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
    copilotService.getCopilotFeedback("extra");
    if (systemDesignState.chats.get("extra")!.length < 1) {
      copilotService.getUpdatedCopilotFeedback("extra");
    }
  };

  return (
    <>
      <Container className="description-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              <br />
              <h3 className="header">
                Extra Considerations & Notes About Your Design
              </h3>
            </Form.Label>
            <br />

            <Col sm="8">
              <Form.Control
                as="textarea"
                rows={5}
                style={{ fontSize: "14px", resize: "none", overflow: "hidden" }}
                placeholder="Enter any additional context/details about your design"
                value={systemDesignState.extraConsiderations}
                onInput={handleTextareaResize}
                onChange={(e) => updateExtraConsiderations(e.target.value)}
              />
            </Col>
          </Form.Group>
          <br></br>
          <div className="copilot-button">
            <Button
              variant="primary"
              style={{ marginRight: "33%" }}
              onClick={handleShowCopilot}
            >
              Copilot
            </Button>
          </div>
        </Form>
      </Container>
      <Copilot
        chatKey="extra"
        show={showCopilot}
        handleClose={() => setShowCopilot(false)}
      />
    </>
  );
}
