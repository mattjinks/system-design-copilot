import {} from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type FunctionalRequirementsExampleProps = {
  show: boolean;
  handleClose: () => void;
};

function NonFunctionalRequirementsExample({
  show,
  handleClose,
}: FunctionalRequirementsExampleProps) {
  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Non-Functional Requirements Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            For a video sharing service such as YouTube you might have the
            following non-functional requirements:
          </Form.Label>

          <Form.Label style={{ fontSize: "14px" }}>
            1. The system should be highly reliable, any video uploaded should
            not be lost
          </Form.Label>

          <Form.Label style={{ fontSize: "14px" }}>
            2. The system should be highly available. Consistency can take a hit
            (in the interest of availability); if a user doesn't see a video for
            a while, it should be fine
          </Form.Label>

          <Form.Label style={{ fontSize: "14px" }}>
            3. Users should have a real-time experience while watching videos
            and should not feel any lag
          </Form.Label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NonFunctionalRequirementsExample;
