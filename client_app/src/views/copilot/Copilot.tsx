import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ChatStream from '../../ChatStream';
import { ChatKey } from '../../state/types';

interface CopilotProps {
  chatKey: ChatKey;
  show: boolean;
  handleClose: () => void;
}
  
export default function Copilot({ chatKey, show, handleClose }: CopilotProps) {

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        {'end'}
      </Button> */}
      <Offcanvas className="custom-offcanvas" show={show} onHide={handleClose} placement={'end'}>
        {/* <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header> */}
        <Offcanvas.Body>
          <ChatStream chatKey={chatKey}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

