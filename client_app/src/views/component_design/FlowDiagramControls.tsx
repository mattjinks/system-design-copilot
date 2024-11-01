/* eslint-disable no-constant-condition */
import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ReactMarkdown from 'react-markdown';
import { useSystemDesignState } from "../../state/FlowStateContext";
import { useUpdateDescriptionHandler } from "../../state/FlowStateHooks";
import Copilot from "../copilot/Copilot";
import './FlowDiagram.css'
import CopilotService from "../../CopilotService";
import DiagramExample from "./DiagramExample";

interface FlowDiagramControlsProps {
  openForm: () => void;
}

export default function FlowDiagramControls({ openForm }: FlowDiagramControlsProps) {
  
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const [ showCopilot, setShowCopilot ] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const copilotService = CopilotService();

  const handleShowCopilot = () => {
    setShowCopilot(!showCopilot);
    if (systemDesignState.chats.get("diagram")!.length < 1) {
      copilotService.getModelFeedback("diagram");
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

        <DiagramExample
          show={show}
          handleClose={handleClose}
        />

        <Button
          variant="outline-primary"
          onClick={openForm}
          className="add-component"
        >
          + Add Component
        </Button>
        <Button variant="primary" onClick={handleShowCopilot}>Copilot</Button>
      </div>
      <Copilot chatKey="diagram" show={showCopilot} handleClose={() => setShowCopilot(false)} />
    </>
  );
}
