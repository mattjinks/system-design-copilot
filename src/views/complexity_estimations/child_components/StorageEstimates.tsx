import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import FunctionalRequirementsForm from "./FunctionalRequirementsForm";
import "../ScalesEstimates.css";
import StorageEstimatesForm from "./StorageEstimatesForm";

const StorageEstimates = () => {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3 className="header">Storage Estimates</h3>
          </Accordion.Header>
          <Accordion.Body>
            <StorageEstimatesForm></StorageEstimatesForm>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default StorageEstimates;
