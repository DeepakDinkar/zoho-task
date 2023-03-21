import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

const ListLayout = ({ children }) => {
  return (
    <Container fluid className="wrapper px-3 py-4">
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {children}
      </Row>
    </Container>
  );
};

export default ListLayout;

ListLayout.prototype = {
  children: PropTypes.any,
};
