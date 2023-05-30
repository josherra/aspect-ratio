import { Link } from "react-router-dom";
import { useAuthStore } from "../store/store";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export const Navigation = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="p-4">
        <Container>
          <Navbar.Brand>Aspect Ratio</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              Games
            </Nav.Link>
            {user ? (
              <Button variant="primary">
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Button>
            ) : (
              <>
                <Button className="mx-2" variant="outline-success">
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </Button>
                <Button variant="outline-info">
                  <Nav.Link as={Link} to="/register">
                    Create Account
                  </Nav.Link>
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
