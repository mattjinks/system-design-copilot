import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import FunctionalRequirements from "./child_components/functional_requirements/FunctionalRequirements";
import NonFunctionalRequirements from "./child_components/nonfunctional_requirements/NonFunctionalRequirements";
import { useSystemDesignState } from "../../state/FlowStateContext";
import Copilot from "../copilot/Copilot";
import "./RequirementsAndGoals.css";
import CopilotService from "../copilot/services/CopilotService";

function RequirementsAndGoals() {
  const { systemDesignState } = useSystemDesignState();
  const [showCopilot, setShowCopilot] = useState(false);

  const copilotService = CopilotService();

  const handleShowCopilot = () => {
    setShowCopilot(!showCopilot);
    if (systemDesignState.chats.get("requirements")!.length < 1) {
      copilotService.getCopilotFeedback("requirements");
    }
  };

  return (
    <>
      <Container className="requirements-container">
        <FunctionalRequirements></FunctionalRequirements>
        <br></br>
        <NonFunctionalRequirements></NonFunctionalRequirements>
        <br />
        <div className="button-group">
          <Button
            variant="primary"
            className="copilot"
            onClick={handleShowCopilot}
          >
            Copilot
          </Button>
        </div>
        <br />
      </Container>
      <Copilot
        chatKey="requirements"
        show={showCopilot}
        handleClose={() => setShowCopilot(false)}
      />
    </>
  );
}

export default RequirementsAndGoals;
