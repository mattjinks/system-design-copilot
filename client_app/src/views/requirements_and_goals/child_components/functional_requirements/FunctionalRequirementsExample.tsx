import {} from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type FunctionalRequirementsExampleProps = {
  show: boolean;
  handleClose: () => void;
};

function FunctionalRequirementsExample({
  show,
  handleClose,
}: FunctionalRequirementsExampleProps) {
  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Functional Requirements Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            For a video sharing service such as YouTube you might have the
            following functional requirements:
          </Form.Label>

          <Form.Label style={{ fontSize: "14px" }}>
            1. Users should be able to upload videos
          </Form.Label>
          <br />
          <Form.Label style={{ fontSize: "14px" }}>
            2. Users should be able to share and view videos
          </Form.Label>

          <Form.Label style={{ fontSize: "14px" }}>
            3. Users should be able to perform searches based on video titles
          </Form.Label>

          <Form.Label style={{ fontSize: "14px" }}>
            4. Users should be able to record stats of videos, e.g.,
            likes/dislikes, total number of views, etc.
          </Form.Label>

          <Form.Label style={{ fontSize: "14px" }}>
            5. Users should be able to add and view comments on videos
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

export default FunctionalRequirementsExample;
