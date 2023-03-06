import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar fixed="top" className="app-bg-primary">
      <Container>
        <Navbar.Brand className="fw-bold font-tilt-prism">
          BLOCKBUSTER
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
