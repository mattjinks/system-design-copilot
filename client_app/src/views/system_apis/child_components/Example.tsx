import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import "../SystemAPIs.css";

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
      <Card
        hidden={show}
        className="mb-3"
        style={{ fontSize: "12px", width: "74%" }}
      >
        <Card.Body>
          <div className="example-header">
            <h3 className="header">Example</h3>
            <div>
              <Button variant="outline-danger" onClick={() => closeExample()}>
                Close
              </Button>
            </div>
          </div>

          <br />
          <div>
            <span>
              For a video sharing service such as YouTube we can have SOAP or
              REST APIs to expose the functionality of our service. The
              following could be the definitions of the API for searching
              videos:
            </span>
          </div>
          <br />
          <Form.Group className="mb-3">
            <Form.Label className="example-label">Endpoint Name:</Form.Label>
            <div>searchVideo()</div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="example-label">Parameters:</Form.Label>
            <div>
              <span>
                <span className="bold-text">api_dev_key (string):</span> The API
                developer key of a registered account. This will be used to,
                among other things, throttle users based on their allocated
                quota.
              </span>
              <br />
              <span>
                <span className="bold-text">search_query (string):</span> A
                string containing the search terms.
              </span>
              <br />
              <span>
                <span className="bold-text">user_location (string):</span>{" "}
                Optional location of the user performing the search.
              </span>
              <br />
              <span>
                <span className="bold-text">
                  maximum_videos_to_return (number):{" "}
                </span>{" "}
                Maximum number of results returned in one request.
              </span>
              <br />
              <span>
                <span className="bold-text">page_token (string):</span> This
                token will specify a page in the result set that should be
                returned.
              </span>
              <br />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="example-label">Returns:</Form.Label>
            <div>
              <span>
                A JSON containing information about the list of video resources
                matching the search query. Each video resource will have a video
                title, a thumbnail, a video creation date, and a view count.
              </span>
            </div>
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );
}
