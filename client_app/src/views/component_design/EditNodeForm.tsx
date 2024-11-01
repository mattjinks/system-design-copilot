import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { SystemDesignStateProvider, useSystemDesignState } from "../../state/FlowStateContext";
import { AppNode, SystemComponentNode } from "../../nodes/types";
import { useUpdateNodesHandler } from "../../state/FlowStateHooks";
import './FlowDiagram.css';

type EditNodeFormProps = {
  show: boolean; // Specify the correct type for the props
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
    //console.log('get node', node);
    return node as SystemComponentNode;
  };

  const initialFormData = getNode(id)?.data;

  const [label, setLabel] = useState(initialFormData?.label || ""); // State for the label input
  const [notes, setNotes] = useState(initialFormData?.notes || "");
  const [leftHandle, setLeftHandle] = useState("target");
  const [rightHandle, setRightHandle] = useState("source");
  const [shape, setShape] = useState(initialFormData?.shape || "rectangle");
  const [color, setColor] = useState(initialFormData?.color || "white");

  const handleUpdateNodes = useUpdateNodesHandler(setSystemDesignState, systemDesignState);

  const getColorValue = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "lightblue",
      green: "lightgreen",
      red: "#ff7b7b",
      pink: "#ffc0ec",
      orange: "#fffcc0", // Use the desired value for orange here
      purple: "#f7c0ff",
      yellow: "#fffcc0",
    };

    return colorMap[color] || color;
  };

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
        y: getNode(id)!.position.y 
      },
      type: "system-component-node",
    };
    console.log(`Handle Form Submit`, formData);
    handleUpdateNodes(updatedNode);
    updateNodeView(formData);
    handleClose();
    // createNode();
    console.log("systemDesignState after submit", systemDesignState);
  };

  return (
    <>
      <SystemDesignStateProvider>
        <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" scrollable>
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
                  value={label} // Bind the state to the input value
                  onChange={(e) => setLabel(e.target.value)} // Update the state on input change
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
                  value={notes} // Bind the state to the textarea value
                  onChange={(e) => setNotes(e.target.value)} // Update the state on textarea change
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
              {/* Trigger form submission */}
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </SystemDesignStateProvider>
    </>
  );
}
