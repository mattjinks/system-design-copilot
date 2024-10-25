import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import FunctionalRequirementsForm from "./FunctionalRequirementsForm";
import NonFunctionalRequirementsForm from "./NonFunctionalRequirementsForm";
import '../RequirementsAndGoals.css'

const NonFunctionalRequirements = () => {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3 className="header">Non-Functional Requirements</h3>
          </Accordion.Header>
          <Accordion.Body>
            <NonFunctionalRequirementsForm></NonFunctionalRequirementsForm>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default NonFunctionalRequirements;
