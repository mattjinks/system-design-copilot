import React, { useState } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import "../SystemAPIs.css";
import "../../../state/types";
import { useSystemDesignState } from "../../../state/FlowStateContext";
import {
  useAddEndpointsHandler,
  useAddParamsHandler,
  useAddReturnsHandler,
  useDeleteEndpointsHandler,
  useDeleteParamsHandler,
  useDeleteReturnsHandler,
  useUpdateEndpointNameHandler,
  useUpdateEndpointNotesHandler,
  useUpdateParamsHandler,
  useUpdateReturnsHandler,
} from "../../../state/FlowStateHooks";
import Copilot from "../../copilot/Copilot";
import CopilotService from "../../copilot/services/CopilotService";

export default function EndpointsForm() {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const [showCopilot, setShowCopilot] = useState(false);

  const copilotService = CopilotService();

  const addEndpoint = useAddEndpointsHandler(setSystemDesignState);
  const deleteEndpoint = useDeleteEndpointsHandler(setSystemDesignState);

  const addParam = useAddParamsHandler(setSystemDesignState);
  const updateParam = useUpdateParamsHandler(setSystemDesignState);
  const deleteParam = useDeleteParamsHandler(setSystemDesignState);

  const addReturn = useAddReturnsHandler(setSystemDesignState);
  const updateReturn = useUpdateReturnsHandler(setSystemDesignState);
  const deleteReturn = useDeleteReturnsHandler(setSystemDesignState);

  const updateName = useUpdateEndpointNameHandler(setSystemDesignState);
  const updateNotes = useUpdateEndpointNotesHandler(setSystemDesignState);

  const handleShowCopilot = () => {
    setShowCopilot(!showCopilot);
    if (systemDesignState.chats.get("apis")!.length < 1) {
      copilotService.getCopilotFeedback("apis");
    }
  };

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Endpoints:");
  };

  return (
    <>
      <br />
      <Form onSubmit={handleSubmit} style={{ fontSize: "14px" }}>
        {systemDesignState.systemAPIs.endpoints.map(
          (endpoint, endpointIndex) => (
            <Card key={endpoint.id} className="mb-3" style={{ width: "74%" }}>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Endpoint {endpointIndex + 1} Name:</Form.Label>
                  <Col sm="12">
                    <Form.Control
                      as="textarea"
                      rows={1}
                      style={{
                        fontSize: "14px",
                        resize: "none",
                        overflow: "hidden",
                      }}
                      placeholder="Enter endpoint name"
                      value={endpoint.name}
                      onChange={(e) =>
                        updateName(endpointIndex, e.target.value)
                      }
                      onInput={handleTextareaResize}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Parameters:</Form.Label>
                  <Col sm="12">
                    {endpoint.params.map((param, paramIndex) => (
                      <Col sm="12" className="requirement-group" key={param.id}>
                        <CloseIcon
                          className="delete"
                          onClick={() => deleteParam(endpointIndex, param.id)}
                        />

                        <Form.Control
                          key={paramIndex}
                          as="textarea"
                          rows={1}
                          style={{
                            fontSize: "14px",
                            resize: "none",
                            overflow: "hidden",
                          }}
                          placeholder={`Parameter ${paramIndex + 1}`}
                          value={param.text}
                          className="mb-2"
                          onChange={(e) =>
                            updateParam(
                              endpointIndex,
                              paramIndex,
                              e.target.value
                            )
                          }
                          onInput={handleTextareaResize}
                        />
                      </Col>
                    ))}
                  </Col>
                  <Button
                    variant="outline-primary"
                    onClick={() => addParam(endpointIndex)}
                    style={{ fontSize: "14px" }}
                  >
                    + Add Parameter
                  </Button>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Returns:</Form.Label>
                  <Col sm="12">
                    {endpoint.returns.map((returnVal, returnIndex) => (
                      <Col
                        sm="12"
                        className="requirement-group"
                        key={returnVal.id}
                      >
                        <CloseIcon
                          className="delete"
                          onClick={() =>
                            deleteReturn(endpointIndex, returnVal.id)
                          }
                        />
                        <Form.Control
                          key={returnIndex}
                          as="textarea"
                          rows={1}
                          style={{
                            fontSize: "14px",
                            resize: "none",
                            overflow: "hidden",
                          }}
                          placeholder={`Return ${returnIndex + 1}`}
                          value={returnVal.text}
                          className="mb-2"
                          onChange={(e) =>
                            updateReturn(
                              endpointIndex,
                              returnIndex,
                              e.target.value
                            )
                          }
                          onInput={handleTextareaResize}
                        />
                      </Col>
                    ))}
                  </Col>
                  <Button
                    variant="outline-primary"
                    onClick={() => addReturn(endpointIndex)}
                    style={{ fontSize: "14px" }}
                  >
                    + Add Return
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
                      value={endpoint.notes}
                      onChange={(e) =>
                        updateNotes(endpointIndex, e.target.value)
                      }
                      onInput={handleTextareaResize}
                    />
                  </Col>
                </Form.Group>
                <br />

                <Button
                  variant="danger"
                  onClick={() => deleteEndpoint(endpointIndex)}
                  style={{ fontSize: "14px" }}
                >
                  Delete Endpoint
                </Button>
              </Card.Body>
            </Card>
          )
        )}

        <div className="api-buttons-container">
          <Button
            variant="outline-primary"
            onClick={addEndpoint}
            className="add-endpoint"
          >
            + Add Endpoint
          </Button>

          <Button variant="primary" onClick={handleShowCopilot}>
            Copilot
          </Button>
        </div>
      </Form>
      <Copilot
        chatKey="apis"
        show={showCopilot}
        handleClose={() => setShowCopilot(false)}
      />
    </>
  );
}
