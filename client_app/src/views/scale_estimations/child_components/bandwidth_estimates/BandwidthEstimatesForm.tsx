import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../ScalesEstimates.css";
import CloseIcon from "@mui/icons-material/Close";
import { useUpdateBandwidthEstimatesHandler } from "../../../../state/FlowStateHooks";
import { SettingsSystemDaydream } from "@mui/icons-material";
import { useSystemDesignState } from "../../../../state/FlowStateContext";
import BandwidthEstimatesExample from "./BandwidthEstimatesExample";

export default function BandwidthEstimatesForm() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateBandwidthEstimates =
    useUpdateBandwidthEstimatesHandler(setSystemDesignState);

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = () => {
    console.log("Submitted Bandwidth Esimate:");
    console.log(systemDesignState);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <BandwidthEstimatesExample show={show} handleClose={handleClose} />
        <Form.Group style={{ fontSize: "12px" }}>
          <Form.Label>
            <Button variant="outline-secondary" onClick={handleShow}>
              See Example
            </Button>
          </Form.Label>
          <br />
          <br />
          <Col sm="12">
            <Form.Control
              as="textarea"
              rows={5}
              style={{ fontSize: "14px", resize: "none", overflow: "hidden" }}
              placeholder="Enter Bandwidth Estimates"
              value={systemDesignState.scaleEstimates.bandwidth}
              onInput={handleTextareaResize}
              onChange={(e) => updateBandwidthEstimates(e.target.value)}
            />
          </Col>
        </Form.Group>
        <br></br>
      </Form>
    </>
  );
}
