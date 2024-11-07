import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ChatStream from "./ChatStream";
import { ChatKey } from "../../state/types";

interface CopilotProps {
  chatKey: ChatKey;
  show: boolean;
  handleClose: () => void;
}

export default function Copilot({ chatKey, show, handleClose }: CopilotProps) {
  return (
    <>
      <Offcanvas
        className="custom-offcanvas"
        show={show}
        onHide={handleClose}
        placement={"end"}
      >
        <Offcanvas.Body>
          <ChatStream chatKey={chatKey} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
