import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../ScalesEstimates.css";
import CloseIcon from "@mui/icons-material/Close";
import { useSystemDesignState } from "../../../state/FlowStateContext";
import { useUpdateCapacityEstimatesHandler } from "../../../state/FlowStateHooks";
import CapacityEstimatesExample from "./CapacityEstimatesExample";

export default function CapacityEstimatesForm() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const [capacityEstimates, setCapacityEstimates] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const updateCapacityEstimates = useUpdateCapacityEstimatesHandler(setSystemDesignState);

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto"; // Reset height so the scrollHeight is recalculated
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust the height to the scroll height
  };

  const handleSubmit = () => {
    e.preventDefault();
    console.log("Submitted Capacity Estimates:");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <CapacityEstimatesExample
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
              placeholder="Enter Capacity Estimates"
              value={systemDesignState.scaleEstimates.capacity}
              onInput={handleTextareaResize} // Handle resizing on input
              onChange={(e) => updateCapacityEstimates(e.target.value)}
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
