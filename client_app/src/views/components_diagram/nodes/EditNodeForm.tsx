import { useState } from "react";
import {} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {
  SystemDesignStateProvider,
  useSystemDesignState,
} from "../../../state/FlowStateContext";
import { AppNode, SystemComponentNode } from "./types";
import { useUpdateNodesHandler } from "../../../state/FlowStateHooks";
import "../FlowDiagram.css";

type EditNodeFormProps = {
  show: boolean;
  id: string;
  handleClose: () => boolean;
  updateNodeView: (formData: {
    label: string;
    notes: string;
    leftHandle: string;
    rightHandle: string;
    shape: string;
    color: string;
  }) => void;
  deleteNode: () => void;
};

export function EditNodeForm({
  show,
  id,
  handleClose,
  updateNodeView,
  deleteNode,
}: EditNodeFormProps) {
  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const getNode = (nodeId: string): SystemComponentNode | undefined => {
    const nodes = systemDesignState.diagram.nodes;
    const node = nodes.find((node) => node.id === nodeId);
    return node as SystemComponentNode;
  };

  const initialFormData = getNode(id)?.data;

  const [label, setLabel] = useState(initialFormData?.label || "");
  const [notes, setNotes] = useState(initialFormData?.notes || "");
  const [leftHandle] = useState("target");
  const [rightHandle] = useState("source");
  const [shape, setShape] = useState(initialFormData?.shape || "rectangle");
  const [color, setColor] = useState(initialFormData?.color || "white");

  const handleUpdateNodes = useUpdateNodesHandler(
    setSystemDesignState,
    systemDesignState
  );

  const handleFormSubmit = () => {
    console.log("Node Info", getNode(id));
    const formData = {
      label: label,
      notes: notes,
      leftHandle: leftHandle,
      rightHandle: rightHandle,
      shape: shape,
      color: color,
    };

    const updatedNode: AppNode = {
      id,
      data: formData,
      position: {
        x: getNode(id)!.position.x,
        y: getNode(id)!.position.y,
      },
      type: "system-component-node",
    };
    console.log(`Handle Form Submit`, formData);
    handleUpdateNodes(updatedNode);
    updateNodeView(formData);
    handleClose();
    console.log("systemDesignState after submit", systemDesignState);
  };

  return (
    <>
      <SystemDesignStateProvider>
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="custom-modal"
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Node</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Button variant="outline-danger" onClick={deleteNode}>
                Delete
              </Button>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              ></Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ fontWeight: "bolder" }}>Label</Form.Label>
                <Form.Control
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  autoFocus
                />
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

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <span style={{ fontWeight: "bolder" }}>Style</span>
                <div className="mb-3 d-flex align-items-center">
                  <div className="mb-3 d-flex align-items-center">
                    <span style={{ paddingRight: "5px" }}>Color:</span>
                    <DropdownButton
                      id="color-dropdown"
                      title={color}
                      variant="outline-dark"
                      style={{ paddingRight: "24px" }}
                    >
                      <Dropdown.Item onClick={() => setColor("white")}>
                        white
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setColor("blue")}>
                        blue
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setColor("green")}>
                        green
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setColor("red")}>
                        red
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setColor("yellow")}>
                        yellow
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setColor("orange")}>
                        orange
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setColor("purple")}>
                        purple
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setColor("pink")}>
                        pink
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="mb-3 d-flex align-items-center">
                    <span style={{ paddingRight: "5px" }}>Shape:</span>
                    <DropdownButton
                      id="shape-dropdown"
                      title={shape}
                      variant="outline-dark"
                      style={{ paddingRight: "24px" }}
                    >
                      <Dropdown.Item onClick={() => setShape("rectangle-long")}>
                        rectangle-long
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setShape("rectangle-tall")}>
                        rectangle-tall
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setShape("square")}>
                        square
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setShape("circle")}>
                        circle
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleFormSubmit}>
              {" "}
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </SystemDesignStateProvider>
    </>
  );
}
