import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./SystemAPIs.css";
import EndpointsForm from "./child_components/EndpointsForm";
import Example from "./child_components/Example";

export default function SystemAPIs() {
  const [closeExample, setCloseExample] = useState(true);

  const handleExampleClose = () => {
    setCloseExample(true);
  };

  const handleExampleOpen = () => {
    setCloseExample(false);
  };

  return (
    <>
      <Container className="database-schema-container">
        <h3 className="header">Define System APIs</h3>
        <div className="padding-bottom-top">
          <Example show={closeExample} handleClose={handleExampleClose} />
        </div>

        <Button
          variant="outline-secondary"
          className="padding-bottom-top"
          hidden={!closeExample}
          onClick={handleExampleOpen}
        >
          See Example
        </Button>
        <EndpointsForm />
        <br />
      </Container>
    </>
  );
}
