import { useState } from "react";
import { Tab, Row, Col, ListGroup } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";

interface NavigationMenuProps {
  onItemSelect: (item: string) => void;
}

export default function NavigationMenu({ onItemSelect }: NavigationMenuProps) {
  const [activeItem, setActiveItem] = useState("description");
  const [hideMenu, setHideMenu] = useState(false);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    onItemSelect(item);
  };

  return (
    <>
      <MenuIcon
        onClick={() => setHideMenu(!hideMenu)}
        className="nav-menu"
        style={{ fontSize: "44px" }}
      ></MenuIcon>

      <div className="menu-options" hidden={hideMenu}>
        <Tab.Container id="list-group-tabs-example">
          <Row>
            <Col sm>
              <ListGroup>
                <ListGroup.Item
                  action
                  onClick={() => handleItemClick("description")}
                  active={activeItem === "description"}
                  className={activeItem === "description" ? "active-item" : ""}
                >
                  Description
                </ListGroup.Item>

                <ListGroup.Item
                  action
                  onClick={() => handleItemClick("requirements")}
                  active={activeItem === "requirements"}
                  className={activeItem === "requirements" ? "active-item" : ""}
                >
                  Requirements & Goals
                </ListGroup.Item>

                <ListGroup.Item
                  action
                  onClick={() => handleItemClick("scale")}
                  active={activeItem === "scale"}
                  className={activeItem === "scale" ? "active-item" : ""}
                >
                  Scale Estimations
                </ListGroup.Item>

                <ListGroup.Item
                  action
                  onClick={() => handleItemClick("apis")}
                  active={activeItem === "apis"}
                  className={activeItem === "apis" ? "active-item" : ""}
                >
                  System APIs
                </ListGroup.Item>

                <ListGroup.Item
                  action
                  onClick={() => handleItemClick("db-schema")}
                  active={activeItem === "db-schema"}
                  className={activeItem === "db-schema" ? "active-item" : ""}
                >
                  Database Schema
                </ListGroup.Item>

                <ListGroup.Item
                  action
                  onClick={() => handleItemClick("flow")}
                  active={activeItem === "flow"}
                  className={activeItem === "flow" ? "active-item" : ""}
                >
                  Components Diagram
                </ListGroup.Item>

                <ListGroup.Item
                  action
                  onClick={() => handleItemClick("extra")}
                  active={activeItem === "extra"}
                  className={activeItem === "extra" ? "active-item" : ""}
                >
                  Extra Considerations
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}
