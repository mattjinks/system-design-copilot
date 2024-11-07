import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import StorageEstimates from "./child_components/storage_estimates/StorageEstimates";
import CapactiyEstimates from "./child_components/capacity_estimates/CapacityEstimates";
import BandwidthEstimates from "./child_components/bandwidth_estimates/BandwidthEstimates";
import Copilot from "../copilot/Copilot";
import CopilotService from "../copilot/services/CopilotService";
import { useSystemDesignState } from "../../state/FlowStateContext";

export default function ScaleEstimates() {
  const { systemDesignState } = useSystemDesignState();
  const [showCopilot, setShowCopilot] = useState(false);

  const copilotService = CopilotService();

  const handleShowCopilot = () => {
    setShowCopilot(!showCopilot);
    if (systemDesignState.chats.get("scaleEstimates")!.length < 1) {
      copilotService.getCopilotFeedback("scaleEstimates");
    }
  };

  return (
    <>
      <Container className="scale-container">
        <CapactiyEstimates />
        <br />
        <StorageEstimates />
        <br />
        <BandwidthEstimates />
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
        chatKey="scaleEstimates"
        show={showCopilot}
        handleClose={() => setShowCopilot(false)}
      />
    </>
  );
}
