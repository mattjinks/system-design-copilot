import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import './FlowDiagram.css';

type CreateNodeFormProps = {
  show: boolean; // Specify the correct type for the props
  handleClose: () => boolean;
  onSubmit: (formData: {
    label: string;
    notes: string;
    leftHandle: string;
    rightHandle: string;
    shape: string;
    color: string;
  }) => void;
};

export function CreateNodeForm({
  show,
  handleClose,
  onSubmit,
}: CreateNodeFormProps) {
  const [label, setLabel] = useState(""); // State for the label input
  const [notes, setNotes] = useState("");
  const [leftHandle, setLeftHandle] = useState("target");
  const [rightHandle, setRightHandle] = useState("source");
  const [topHandle, setTopHandle] = useState("target");
  const [bottomHandle, setBottomHandle] = useState("source");
  const [shape, setShape] = useState("rectangle");
  const [color, setColor] = useState("white");

  const handleFormSubmit = () => {
    // Create an object with form data and pass it to the onSubmit function
    console.log("Form Submit");
    setLabel("");
    setNotes("");
    setColor("white");
    setShape("square");
    onSubmit({
      label: label,
      notes: notes,
      leftHandle: leftHandle,
      rightHandle: rightHandle,
      shape: shape,
      color: getColorValue(color),
    });
    handleClose(); // Close the modal after submission
  };

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

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Create Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
              <Form.Label style={{ fontWeight: "bolder" }}>Additional Notes/Context</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes} // Bind the state to the textarea value
                onChange={(e) => setNotes(e.target.value)} // Update the state on textarea change
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            Add Component
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
