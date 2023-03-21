import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Navbar fixed="top" className="app-bg-primary">
      <Container fluid className="justify-content-start">
        <Navbar.Brand
          className="fw-bold font-tilt-prism"
          onClick={() => navigate("/")}
        >
          BLOCKBUSTER 
        </Navbar.Brand>
        <Nav.Link
          onClick={() => navigate("/movies")}
          className={`mx-2 fw-bold ${
            pathname.includes("movies") ? "link-active" : ""
          }`}
        >
          Movies
        </Nav.Link>
        <Nav.Link
          onClick={() => navigate("/theatres")}
          className={`mx-2 fw-bold ${
            pathname.includes("theatres") ? "link-active" : ""
          }`}
        >
          Theatres
        </Nav.Link>
      </Container>
    </Navbar>
  );
};

export default Header;
