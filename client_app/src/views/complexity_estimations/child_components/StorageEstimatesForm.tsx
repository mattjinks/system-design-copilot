import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../ScalesEstimates.css";
import CloseIcon from "@mui/icons-material/Close";
import { useSystemDesignState } from "../../../state/FlowStateContext";
import { useUpdateStorageEstimatesHandler } from "../../../state/FlowStateHooks";
import StorageEstimatesExample from "./StorageEstimatesExample";

export default function StorageEstimatesForm() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const [storageEstimates, setStorageEstimates] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateStorageEstimates = useUpdateStorageEstimatesHandler(setSystemDesignState);

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto"; // Reset height so the scrollHeight is recalculated
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust the height to the scroll height
  }; 

  const handleSubmit = () => {
    console.log("Submitted Storage Estimates:");
    console.log()
  };

  return (
    <>
      <Form>
        <StorageEstimatesExample
          show={show}
          handleClose={handleClose}
        />
        <Form.Group style={{ fontSize: "12px" }}>
          <Form.Label>
            <Button variant="outline-secondary" onClick={handleShow}>
              See Example
            </Button>
          </Form.Label>
          <br/>
          <br/>
          <Col sm="12">
            <Form.Control
              as="textarea"
              rows={5}
              style={{ fontSize: "14px", resize: "none", overflow: "hidden" }} // Ensure the textarea does not manually resize
              placeholder="Enter Storage Estimates"
              value={systemDesignState.scaleEstimates.storage}
              onInput={handleTextareaResize} // Handle resizing on input
              onChange={(e) => updateStorageEstimates(e.target.value)}
            />
          </Col>
        </Form.Group>
        <br></br>

        {/* <Button variant="success" type="submit">
          Submit
        </Button> */}
      </Form>
    </>
  );
}
