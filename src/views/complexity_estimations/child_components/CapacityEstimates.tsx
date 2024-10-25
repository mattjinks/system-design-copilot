import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import FunctionalRequirementsForm from "./FunctionalRequirementsForm";
import "../ScalesEstimates.css";
import StorageEstimatesForm from "./StorageEstimatesForm";
import CapacityEstimatesForm from "./CapacityEstimatesForm";

const CapactiyEstimates = () => {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3 className="header">Capacity Estimates</h3>
          </Accordion.Header>
          <Accordion.Body>
            <CapacityEstimatesForm />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default CapactiyEstimates;
