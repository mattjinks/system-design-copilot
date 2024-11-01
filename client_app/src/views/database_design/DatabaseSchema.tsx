import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import FunctionalRequirementsForm from "./FunctionalRequirementsForm";
import "./DatabaseSchema.css";
import EndpointsForm from "./child_components/EndpointsForm";

import DataModelsForm from "./child_components/DataModelsForm";
import Example from "./child_components/Example";
import Copilot from "../copilot/Copilot";

export default function DatabaseSchema() {
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
        <h3 className="header">Database Schema</h3>
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
        <DataModelsForm />
        <br/>
      </Container>
    </>
  );
}
