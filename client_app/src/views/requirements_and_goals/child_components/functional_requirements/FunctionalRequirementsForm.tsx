import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useSystemDesignState } from "../../../../state/FlowStateContext";
import {
  useAddFunctionalRequirementsHandler,
  useUpdateFunctionalRequirementsHandler,
  useDeleteFunctionalRequirementsHandler,
} from "../../../../state/FlowStateHooks";
import FunctionalRequirementsExample from "./FunctionalRequirementsExample";

export default function FunctionalRequirementsForm() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addRequirement =
    useAddFunctionalRequirementsHandler(setSystemDesignState);
  const updateRequirement =
    useUpdateFunctionalRequirementsHandler(setSystemDesignState);
  const deleteRequirement =
    useDeleteFunctionalRequirementsHandler(setSystemDesignState);

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <>
      <Form>
        <FunctionalRequirementsExample show={show} handleClose={handleClose} />
        <Form.Label>
          <Button variant="outline-secondary" onClick={handleShow}>
            See Example
          </Button>
        </Form.Label>
        <br />
        {systemDesignState.requirements.functional.map((req, index) => (
          <Form.Group
            as={Row}
            key={req.id}
            className="mb-3"
            style={{ fontSize: "14px" }}
          >
            <Col sm="11" className="requirement-group">
              <CloseIcon
                className="delete"
                onClick={() => deleteRequirement(req)}
              />

              <Form.Control
                as="textarea"
                rows={1}
                style={{ fontSize: "14px", resize: "none", overflow: "hidden" }}
                placeholder="Enter a functional requirement"
                value={req.text}
                onChange={(e) => updateRequirement(index, e.target.value)}
                onInput={handleTextareaResize}
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
