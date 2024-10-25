import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type FunctionalRequirementsExampleProps = {
  show: boolean;
  handleClose: () => void;
};

function CapacityEstimatesExample({ show, handleClose }: FunctionalRequirementsExampleProps) {


  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Capacity Estimates Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            For a video sharing service such as YouTube, let's assume we have
            1.5 billion total users, 800 million of whom are daily active
            users. If on average, a user views five videos per day then the
            total video-views per second would be:
          </Form.Label>

          <div className="calculation">
            800M * 5 / 86400 sec ={">"} 46K videos/sec
          </div>

          <div className="padding-bottom">
            Let's assume our upload:view ratio is 1:200, i.e., for every video
            upload we have 200 videos viewed, giving us 230 videos uploaded
            per second.
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

export default CapacityEstimatesExample;