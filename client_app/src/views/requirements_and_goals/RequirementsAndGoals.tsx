import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import FunctionalRequirements from "./child_components/FunctionalRequirements";
import NonFunctionalRequirements from "./child_components/NonFunctionalRequirements";
import { useSystemDesignState } from "../../state/FlowStateContext";
import ReactMarkdown from "react-markdown";
import Copilot from "../copilot/Copilot";
import './RequirementsAndGoals.css'
import CopilotService from "../../CopilotService";

function RequirementsAndGoals() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const [ showCopilot, setShowCopilot ] = useState(false);

  const copilotService = CopilotService();

  const handleShowCopilot = () => {
    setShowCopilot(!showCopilot);
    if (systemDesignState.chats.get("requirements")!.length < 1) {
      copilotService.getModelFeedback("requirements");
    }
  };

  return (
    <>
    <Container className="requirements-container">
      <FunctionalRequirements></FunctionalRequirements>
      <br></br>
      <NonFunctionalRequirements></NonFunctionalRequirements>
      <br/>
      <div className="button-group">
        <Button variant="primary" className="copilot" onClick={handleShowCopilot}>Copilot</Button>
      </div>
      <br/>
    </Container>
    <Copilot chatKey="requirements" show={showCopilot} handleClose={() => setShowCopilot(false)} />
    </>
  );
}

export default RequirementsAndGoals;
