import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSystemDesignState } from "../../state/FlowStateContext";
import Copilot from "../copilot/Copilot";
import "./FlowDiagram.css";
import CopilotService from "../copilot/services/CopilotService";
import DiagramExample from "./DiagramExample";

interface FlowDiagramControlsProps {
  openForm: () => void;
}

export default function FlowDiagramControls({
  openForm,
}: FlowDiagramControlsProps) {
  const { systemDesignState } = useSystemDesignState();
  const [showCopilot, setShowCopilot] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const copilotService = CopilotService();

  const handleShowCopilot = () => {
    setShowCopilot(!showCopilot);
    if (systemDesignState.chats.get("diagram")!.length < 1) {
      copilotService.getCopilotFeedback("diagram");
    }
  };

  return (
    <>
      <div className="buttons-container">
        <Button
          variant="outline-secondary"
          onClick={handleShow}
          className="add-component"
        >
          See Example
        </Button>

        <DiagramExample show={show} handleClose={handleClose} />

        <Button
          variant="outline-primary"
          onClick={openForm}
          className="add-component"
        >
          + Add Component
        </Button>

        <Button variant="primary" onClick={handleShowCopilot}>
          Copilot
        </Button>
      </div>

      <Copilot
        chatKey="diagram"
        show={showCopilot}
        handleClose={() => setShowCopilot(false)}
      />
    </>
  );
}
