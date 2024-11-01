import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type FunctionalRequirementsExampleProps = {
  show: boolean;
  handleClose: () => void;
};

function StorageEstimatesExample({ show, handleClose }: FunctionalRequirementsExampleProps) {


  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Storage Estimates Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            For a video sharing service such as YouTube, let's assume that
            every minute 500 hours worth of videos are uploaded to Youtube. If
            on average, one minute of video needs 50MB of storage (videos need
            to be stored in multiple formats), the total storage needed for
            videos uploaded in a minute would be:
          </Form.Label>

          <div className="calculation">
            500 hours * 60 min * 50MB ={">"} 1500 GB/min (25 GB/sec)
          </div>

          <div className="padding-bottom">
            These are estimated numbers ignoring video compression and
            replication, which would change real numbers
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

export default StorageEstimatesExample;