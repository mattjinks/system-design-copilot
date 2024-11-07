import React from "react";
import { Accordion } from "react-bootstrap";
import NonFunctionalRequirementsForm from "./NonFunctionalRequirementsForm";
import "../../RequirementsAndGoals.css";

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
