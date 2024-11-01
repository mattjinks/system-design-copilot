import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import "../DatabaseSchema.css";

type ExampleProps = {
  show: boolean;
  handleClose: () => void;
};

export default function EndpointsForm({ show, handleClose }: ExampleProps) {
  const closeExample = () => {
    handleClose();
  };

  return (
    <>
      <Card hidden={show} className="mb-3" style={{ fontSize:"12px", width: "74%" }}>
        <Card.Body>
          {/* Endpoint Name */}
          <div className="example-header">
            <h3 className="header">Example</h3>
            <div>
              <Button variant="danger" onClick={() => closeExample()}>
                X Close
              </Button>
            </div>
          </div>

          <br />
          <div>
            <span>
              For a video sharing service such as YouTube, video metadata can be
              stored in a SQL database. The following information should be
              stored with each video:
            </span>
          </div>

          <Form.Group className="mb-3" style={{ marginTop: "1%" }}>
            <div>
              <span>- VideoID</span>
              <br />
              <span>- Title</span>
              <br />
              <span>- Description</span>
              <br />
              <span>- Size</span>
              <br />
              <span>- Thumbnail</span>
              <br />
              <span>- Uploader/User</span>
              <br />
              <span>- Total number of likes</span>
              <br />
              <span>- Total number of dislikes</span>
              <br />
              <span>- Total number of views</span>
              <br />
            </div>
          </Form.Group>

          <div>
            <span>
              For each video comment, we need to store following information:
            </span>
          </div>

          {/* Parameters */}
          <Form.Group className="mb-3" style={{ marginTop: "1%" }}>
            <div>
              <span>- CommentID</span>
              <br />
              <span>- VideoID</span>
              <br />
              <span>- UserID</span>
              <br />
              <span>- Comment</span>
              <br />
              <span>- TimeOfCreation</span>
              <br />
            </div>
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );
}
