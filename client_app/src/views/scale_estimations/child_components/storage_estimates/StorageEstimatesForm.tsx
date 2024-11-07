import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import "../../ScalesEstimates.css";
import { useSystemDesignState } from "../../../../state/FlowStateContext";
import { useUpdateStorageEstimatesHandler } from "../../../../state/FlowStateHooks";
import StorageEstimatesExample from "./StorageEstimatesExample";

export default function StorageEstimatesForm() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateStorageEstimates =
    useUpdateStorageEstimatesHandler(setSystemDesignState);

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <>
      <Form>
        <StorageEstimatesExample show={show} handleClose={handleClose} />
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
              placeholder="Enter Storage Estimates"
              value={systemDesignState.scaleEstimates.storage}
              onInput={handleTextareaResize}
              onChange={(e) => updateStorageEstimates(e.target.value)}
            />
          </Col>
        </Form.Group>
        <br></br>
      </Form>
    </>
  );
}
