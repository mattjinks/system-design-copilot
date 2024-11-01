import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAddNonFunctionalRequirementsHandler, useUpdateNonFunctionalRequirementsHandler, useDeleteNonFunctionalRequirementsHandler } from "../../../state/FlowStateHooks";
import { useSystemDesignState } from "../../../state/FlowStateContext";
import CopilotService from "../../../CopilotService";
import NonFunctionalRequirementsExample from "./NonFunctionalRequirementsExample";

export default function NonFunctionalRequirementsForm() {
  
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const copilotService = CopilotService();

  const [requirements, setRequirements] = useState([{ id: 1, text: "" }]);

  const addRequirement = useAddNonFunctionalRequirementsHandler(setSystemDesignState);
  const updateRequirement = useUpdateNonFunctionalRequirementsHandler(setSystemDesignState);
  const deleteRequirement = useDeleteNonFunctionalRequirementsHandler(setSystemDesignState);

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto"; // Reset height so the scrollHeight is recalculated
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust the height to the scroll height
  };

  const handleSubmit = () => {
    copilotService.chatAboutRequirements();
    console.log(systemDesignState);
  };

  return (
    <>
      <Form>
        <NonFunctionalRequirementsExample
          show={show}
          handleClose={handleClose}
        />
        <Form.Label>
          <Button variant="outline-secondary" onClick={handleShow}>
            See Example
          </Button>
        </Form.Label>
        <br />
        {systemDesignState.requirements.nonFunctional.map((req, index) => (
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
                placeholder="Enter a non-functional requirement"
                value={req.text}
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
        </div>
      </Form>
    </>
  );
}
