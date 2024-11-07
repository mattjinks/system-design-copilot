import React from "react";
import { Accordion } from "react-bootstrap";
import "../../ScalesEstimates.css";
import BandwidthEstimatesForm from "./BandwidthEstimatesForm";

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
