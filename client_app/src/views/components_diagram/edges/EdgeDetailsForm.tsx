import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap";
import { AppNode } from "../nodes/types";
import "./edges.css";

type EdgeDetailsFormProps = {
  show: boolean;
  onClose: () => boolean;
  handleEdgeUpdate: (data: { dataFlow: string; notes: string }) => void;
  deleteEdge: () => void;
  source: AppNode;
  target: AppNode;
  dataFlow: string;
  setDataFlow: (dataFlow: string) => void;
  createForm: boolean;
};

export function EdgeDetailsForm({
  show,
  handleEdgeUpdate,
  onClose,
  deleteEdge,
  source,
  target,
  dataFlow,
  createForm,
}: EdgeDetailsFormProps) {
  const directionTargetToSource = "<--";
  const directionSourceToTarget = "-->";
  const bidirectional = "<-->";

  const [sourceNodeLabel, setSourceNodeLabel] = useState(source.data.label);
  const [targetNodeLabel, setTargetNodeLabel] = useState(target.data.label);
  const [direction, setDirection] = useState(directionSourceToTarget);
  const [notes, setNotes] = useState("");
  const [flowDescription, setFlowDescription] = useState(dataFlow);

  const handleFormSubmit = () => {
    console.log("Edge Form Submit");
    console.log(sourceNodeLabel);
    console.log(targetNodeLabel);
    handleDataFlowChange(direction, sourceNodeLabel, targetNodeLabel);
    handleEdgeUpdate({ dataFlow: flowDescription, notes: notes });
    console.log(flowDescription);
    onClose();
  };

  const handleSourceNodeChange = (selectedNode: string) => {
    if (selectedNode === sourceNodeLabel) {
      return null;
    }
    let updatedTargetNodeLabel = sourceNodeLabel;
    if (selectedNode === targetNodeLabel) {
      updatedTargetNodeLabel = sourceNodeLabel;
      setTargetNodeLabel(sourceNodeLabel);
    }
    console.log("SourceNodeLabel: ", sourceNodeLabel);

    const updatedSourceNodeLabel = selectedNode;
    setSourceNodeLabel(updatedSourceNodeLabel);

    console.log("SourceNodeLabel: ", updatedSourceNodeLabel);
    handleDataFlowChange(
      direction,
      updatedSourceNodeLabel,
      updatedTargetNodeLabel
    );
  };

  const handleDataFlowChange = (
    flow: string,
    updatedSourceNodeLabel: string,
    updatedTargetNodeLabel: string
  ) => {
    console.log("handleDataFlowChange", "booger" + flow);

    setDirection(flow);

    if (flow === directionSourceToTarget) {
      setFlowDescription(
        `Data Flows from ${updatedSourceNodeLabel} to ${updatedTargetNodeLabel}`
      );
    } else if (flow === directionTargetToSource) {
      setFlowDescription(
        `Data Flows from ${updatedTargetNodeLabel} to ${updatedSourceNodeLabel}`
      );
    } else if (flow === bidirectional) {
      setFlowDescription(
        `Data Flows between ${updatedSourceNodeLabel} and ${updatedTargetNodeLabel}`
      );
    }
  };

  const handleTargetNodeChange = (selectedNode: string) => {
    if (selectedNode === targetNodeLabel) {
      return null;
    }
    let updatedSourceNodeLabel = sourceNodeLabel;
    if (selectedNode === sourceNodeLabel) {
      updatedSourceNodeLabel = targetNodeLabel;
      setSourceNodeLabel(targetNodeLabel);
    }
    const updatedTargetNodeLabel = selectedNode;
    setTargetNodeLabel(updatedTargetNodeLabel);

    console.log("TargetNodeLabel: ", updatedTargetNodeLabel);
    handleDataFlowChange(
      direction,
      updatedSourceNodeLabel,
      updatedTargetNodeLabel
    );
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={onClose}
        dialogClassName="modal-90w"
        contentClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {createForm ? "Create" : "Edit"} Edge
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Button variant="outline-danger" onClick={deleteEdge}>
              Delete
            </Button>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            ></Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{ fontWeight: "bolder" }}>
                Data Flow
              </Form.Label>
              <br />
              <Form.Label className="data-flow">{flowDescription}</Form.Label>
              <div className="mb-3 d-flex align-items-center">
                <div className="mb-3 d-flex align-items-center">
                  <DropdownButton
                    id="color-dropdown"
                    title={sourceNodeLabel}
                    variant="outline-dark"
                    className="btn-fixed"
                    style={{ paddingRight: "24px" }}
                  >
                    <Dropdown.Item
                      onClick={() => handleSourceNodeChange(source.data.label)}
                    >
                      {source.data.label}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSourceNodeChange(target.data.label)}
                    >
                      {target.data.label}
                    </Dropdown.Item>
                  </DropdownButton>

                  <DropdownButton
                    id="color-dropdown"
                    title={direction}
                    variant="outline-dark"
                    style={{ paddingRight: "24px" }}
                  >
                    <Dropdown.Item
                      onClick={() =>
                        handleDataFlowChange(
                          directionSourceToTarget,
                          sourceNodeLabel,
                          targetNodeLabel
                        )
                      }
                    >
                      {directionSourceToTarget}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleDataFlowChange(
                          directionTargetToSource,
                          sourceNodeLabel,
                          targetNodeLabel
                        )
                      }
                    >
                      {directionTargetToSource}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleDataFlowChange(
                          bidirectional,
                          sourceNodeLabel,
                          targetNodeLabel
                        )
                      }
                    >
                      {bidirectional}
                    </Dropdown.Item>
                  </DropdownButton>

                  <DropdownButton
                    id="color-dropdown"
                    title={targetNodeLabel}
                    variant="outline-dark"
                    style={{ paddingRight: "24px" }}
                  >
                    <Dropdown.Item
                      onClick={() => handleTargetNodeChange(source.data.label)}
                    >
                      {source.data.label}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleTargetNodeChange(target.data.label)}
                    >
                      {target.data.label}
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{ fontWeight: "bolder" }}>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            {createForm ? "OK" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
