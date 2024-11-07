import React from "react";
import { Accordion } from "react-bootstrap";
import "../../ScalesEstimates.css";
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
