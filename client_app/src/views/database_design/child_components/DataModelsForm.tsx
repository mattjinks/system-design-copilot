import React, { useState } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import "../DatabaseSchema.css";
import { useSystemDesignState } from "../../../state/FlowStateContext";
import {
  useAddDataHandler,
  useAddModelHandler,
  useDeleteDataHandler,
  useDeleteModelHandler,
  useUpdateDataHandler,
  useUpdateModelNameHandler,
  useUpdateModelNotesHandler,
} from "../../../state/FlowStateHooks";
import Copilot from "../../copilot/Copilot";
import CopilotService from "../../copilot/services/CopilotService";

export default function DataModelsForm() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const [showCopilot, setShowCopilot] = useState(false);

  const copilotService = CopilotService();

  const addModel = useAddModelHandler(setSystemDesignState);
  const deleteModel = useDeleteModelHandler(setSystemDesignState);

  const addData = useAddDataHandler(setSystemDesignState);
  const updateData = useUpdateDataHandler(setSystemDesignState);
  const deleteData = useDeleteDataHandler(setSystemDesignState);

  const updateName = useUpdateModelNameHandler(setSystemDesignState);
  const updateNotes = useUpdateModelNotesHandler(setSystemDesignState);

  const handleShowCopilot = () => {
    setShowCopilot(!showCopilot);
    if (systemDesignState.chats.get("dbSchema")!.length < 1) {
      copilotService.getCopilotFeedback("dbSchema");
    }
  };

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Models:");
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{ fontSize: "14px" }}>
        {systemDesignState.dbSchema.models.map((model, modelIndex) => (
          <Card key={model.id} className="mb-3" style={{ width: "74%" }}>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Model Name:</Form.Label>
                <Col sm="12" key={model.id}>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    style={{
                      fontSize: "14px",
                      resize: "none",
                      overflow: "hidden",
                    }}
                    placeholder="Enter model name"
                    value={model.name}
                    onChange={(e) => updateName(model.id, e.target.value)}
                    onInput={handleTextareaResize}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data:</Form.Label>
                <Col sm="12">
                  {model.data.map((data, dataIndex) => (
                    <Col sm="12" className="models-group" key={data.id}>
                      <CloseIcon
                        className="delete"
                        onClick={() => deleteData(model.id, data.id)}
                      />
                      <Form.Control
                        key={dataIndex}
                        as="textarea"
                        rows={1}
                        style={{
                          fontSize: "14px",
                          resize: "none",
                          overflow: "hidden",
                        }}
                        placeholder={`Enter Data`}
                        value={data.text}
                        className="mb-2"
                        onChange={(e) =>
                          updateData(modelIndex, dataIndex, e.target.value)
                        }
                        onInput={handleTextareaResize}
                      />
                    </Col>
                  ))}
                </Col>
                <Button
                  variant="outline-primary"
                  onClick={() => addData(model.id)}
                  style={{ fontSize: "14px" }}
                >
                  + Add Data
                </Button>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Additional Notes/Context:</Form.Label>
                <Col sm="12">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{
                      fontSize: "14px",
                      resize: "none",
                      overflow: "hidden",
                    }}
                    placeholder="Enter additional notes/context"
                    value={model.notes}
                    onChange={(e) => updateNotes(model.id, e.target.value)}
                    onInput={handleTextareaResize}
                  />
                </Col>
              </Form.Group>
              <br />
              <Button
                style={{ fontSize: "14px" }}
                variant="danger"
                onClick={() => deleteModel(model.id)}
              >
                Delete Model
              </Button>
            </Card.Body>
          </Card>
        ))}
        <div className="db-buttons-container">
          <Button
            variant="outline-primary"
            onClick={addModel}
            className="add-model"
          >
            + Add Model
          </Button>

          <Button variant="primary" onClick={handleShowCopilot}>
            Copilot
          </Button>
        </div>
      </Form>
      <Copilot
        chatKey="dbSchema"
        show={showCopilot}
        handleClose={() => setShowCopilot(false)}
      />
    </>
  );
}
