import React from "react";
import { Accordion } from "react-bootstrap";
import "../../RequirementsAndGoals.css";
import FunctionalRequirementsForm from "./FunctionalRequirementsForm";

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
