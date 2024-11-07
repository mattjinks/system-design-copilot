import { useState } from "react";
import {} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../FlowDiagram.css";

type CreateNodeFormProps = {
  show: boolean;
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
  const [label, setLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [leftHandle] = useState("target");
  const [rightHandle] = useState("source");
  const [shape, setShape] = useState("rectangle");
  const [color, setColor] = useState("white");

  const handleFormSubmit = () => {
    console.log("Form Submit");
    // setLabel("");
    // setNotes("");
    // setColor("white");
    // setShape("square");
    onSubmit({
      label: label,
      notes: notes,
      leftHandle: leftHandle,
      rightHandle: rightHandle,
      shape: shape,
      color: color,
    });
    handleClose();
  };

  const getColorValue = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "lightblue",
      green: "lightgreen",
      red: "#ff7b7b",
      pink: "#ffc0ec",
      orange: "#fffcc0",
      purple: "#f7c0ff",
      yellow: "#fffcc0",
    };

    return colorMap[color] || color;
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="custom-modal"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
              <Form.Label style={{ fontWeight: "bolder" }}>
                Additional Notes/Context
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
            Add Component
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
