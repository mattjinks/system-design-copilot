import {} from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type FunctionalRequirementsExampleProps = {
  show: boolean;
  handleClose: () => void;
};

function BandwidthEstimatesExample({
  show,
  handleClose,
}: FunctionalRequirementsExampleProps) {
  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Bandwidth Estimates Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            For a video sharing service such as YouTube, let's assume With 500
            hours of video uploads per minute (which is 30000 mins of video
            uploads per minute), assuming uploading each minute of the video
            takes 10MB of the bandwidth, we would be getting 300GB of uploads
            every minute.
          </Form.Label>

          <div className="calculation">
            500 hours * 60 mins * 10MB ={">"} 300GB/min (5GB/sec) (25 GB/sec)
          </div>

          <div className="padding-bottom">
            Assuming an upload:view ratio of 1:200, we would need 1TB/s outgoing
            bandwidth.
          </div>
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

export default BandwidthEstimatesExample;
