import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import "../../ScalesEstimates.css";
import { useSystemDesignState } from "../../../../state/FlowStateContext";
import { useUpdateCapacityEstimatesHandler } from "../../../../state/FlowStateHooks";
import CapacityEstimatesExample from "./CapacityEstimatesExample";

export default function CapacityEstimatesForm() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateCapacityEstimates =
    useUpdateCapacityEstimatesHandler(setSystemDesignState);

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <>
      <Form>
        <CapacityEstimatesExample show={show} handleClose={handleClose} />
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
              placeholder="Enter Capacity Estimates"
              value={systemDesignState.scaleEstimates.capacity}
              onInput={handleTextareaResize}
              onChange={(e) => updateCapacityEstimates(e.target.value)}
            />
          </Col>
        </Form.Group>
        <br></br>
      </Form>
    </>
  );
}
