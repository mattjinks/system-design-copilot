import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavigationMenu from "./NavigationMenu";

interface NavBarProps {
  onItemSelect: (item: string) => void;
}

function NavBar({ onItemSelect }: NavBarProps) {
  return (
    <Container>
      <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
          <NavigationMenu onItemSelect={onItemSelect} />
        </Container>
      </Navbar>
    </Container>
  );
}

export default NavBar;
