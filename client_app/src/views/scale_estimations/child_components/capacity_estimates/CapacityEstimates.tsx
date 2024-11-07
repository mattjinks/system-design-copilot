import React from "react";
import { Accordion } from "react-bootstrap";
import "../../ScalesEstimates.css";
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
