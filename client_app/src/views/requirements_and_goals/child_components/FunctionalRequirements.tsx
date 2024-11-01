import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import FunctionalRequirementsForm from "./FunctionalRequirementsForm";
import "../RequirementsAndGoals.css";

const FunctionalRequirements = () => {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3 className="header">Functional Requirements</h3>
          </Accordion.Header>
          <Accordion.Body>
            <FunctionalRequirementsForm></FunctionalRequirementsForm>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default FunctionalRequirements;
