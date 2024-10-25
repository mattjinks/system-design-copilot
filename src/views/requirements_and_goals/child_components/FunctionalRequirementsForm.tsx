import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useSystemDesignState } from "../../../state/FlowStateContext";
import { useAddFunctionalRequirementsHandler, useUpdateFunctionalRequirementsHandler, useDeleteFunctionalRequirementsHandler } from "../../../state/FlowStateHooks";
import FunctionalRequirementsExample from "./FunctionalRequirementsExample";

export default function FunctionalRequirementsForm() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const [requirements, setRequirements] = useState([{ id: 1, text: "" }]);
  const [hideExample, setHideExample] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addRequirement = useAddFunctionalRequirementsHandler(setSystemDesignState);
  const updateRequirement = useUpdateFunctionalRequirementsHandler(setSystemDesignState);
  const deleteRequirement = useDeleteFunctionalRequirementsHandler(setSystemDesignState);

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index].text = value;
    setRequirements(updatedRequirements);
  };

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto"; // Reset height so the scrollHeight is recalculated
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust the height to the scroll height
  };

  const handleSubmit = () => {
    console.log("Submitted Requirements:", requirements);
    console.log(systemDesignState);
  };

  return (
    <>
      <Form>
        <FunctionalRequirementsExample
          show={show}
          handleClose={handleClose}
        />
        <Form.Label>
          <Button variant="outline-secondary" onClick={handleShow}>
            See Example
          </Button>
        </Form.Label>
        <br/>
        {systemDesignState.requirements.functional.map((req, index) => (
          <Form.Group as={Row} key={req.id} className="mb-3" style={{ fontSize: "14px" }}>
            <Form.Label>Requirement {index + 1}:</Form.Label>
            <Col sm="11" className="requirement-group">
              <CloseIcon
                className="delete"
                onClick={() => deleteRequirement(req)}
              />

              <Form.Control
                as="textarea"
                rows={1}
                style={{ fontSize: "14px", resize: "none", overflow: "hidden" }} // Ensure the textarea does not manually resize
                placeholder="Enter a functional requirement"
                value={req.text}
                // onChange={(e) => handleRequirementChange(index, e.target.value)}
                onChange={(e) => updateRequirement(index, e.target.value)}
                onInput={handleTextareaResize} // Handle resizing on input
              />
            </Col>
          </Form.Group>
        ))}
        <div className="button-group">
          <Button
            variant="outline-primary"
            onClick={addRequirement}
            className="add-requirement"
          >
            + Add Requirement
          </Button>

          {/* <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button> */}
        </div>
      </Form>
    </>
  );
}
