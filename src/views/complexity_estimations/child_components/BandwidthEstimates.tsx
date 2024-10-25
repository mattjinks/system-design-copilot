import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import FunctionalRequirementsForm from "./FunctionalRequirementsForm";
import "../ScalesEstimates.css";
import StorageEstimatesForm from "./StorageEstimatesForm";
import BandwidthEstimatesForm from "./BandwidthEstimatesForm";
import '../ScaleEstimates'

const BandwidthEstimates = () => {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3 className="header">Bandwidth Estimates</h3>
          </Accordion.Header>
          <Accordion.Body>
            <BandwidthEstimatesForm />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default BandwidthEstimates;
