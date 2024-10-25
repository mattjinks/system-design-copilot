import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import diagramImage from '../../assets/diagram-example.png';

type FunctionalRequirementsExampleProps = {
  show: boolean;
  handleClose: () => void;
};

function DiagramExample({ show, handleClose }: FunctionalRequirementsExampleProps) {

  return (
    <>
      <Modal show={show} onHide={handleClose} fullscreen={true} dialogClassName="">
        <Modal.Header closeButton>
          <Modal.Title>Sytem Diagram Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            For a video sharing service such as YouTube a system diagram might have the following components:
          </Form.Label>

          <div className="diagram">
            <img src={diagramImage} alt="System Diagram Example" style={{ width: '100%' }} />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DiagramExample;