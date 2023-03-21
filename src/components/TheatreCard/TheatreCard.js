import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const TheatreCard = ({ theatre }) => {
  const navigate = useNavigate();

  return (
    <Col
      onClick={() => navigate(`/theatre/${theatre.theatre_name}`)}
      key={theatre.theatre_name}
    >
      <Card className="movie-card">
        <Card.Img
          variant="top"
          src={theatre.thumbnail_url}
          className="movie-card-img"
          alt={theatre.theatre_name}
          onError={(event) =>
            (event.target.src = process.env.PUBLIC_URL + "/img/theatre.jpg")
          }
        />
        <Card.Body>
          <div>
            <Card.Title className="fw-bold text-uppercase">
              {theatre.theatre_name}
            </Card.Title>
            <span className="movie-rating">
              <i className="star-rating d-inline-block position-relative"></i>
              {theatre.customer_rating} / 10
            </span>
          </div>
          <div className="movie-info pt-2">
            <div className="title">{theatre.address}</div>
            <div className="title">
              <a className="link-secondary" href={theatre.website}>
                {theatre.website}
              </a>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TheatreCard;

TheatreCard.prototype = {
  theatre: PropTypes.any,
};
