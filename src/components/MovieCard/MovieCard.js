import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  /**
   * Returns tags array from tags string array.
   * @param {*} tags
   * @returns
   */
  const getTags = (tags) => {
    return tags ? tags.split(",") : [];
  };

  return (
    <Col
      onClick={() => navigate(`/movie/${movie.movie_name}`)}
      key={movie.movie_name}
    >
      <Card className="movie-card">
        <Card.Img
          variant="top"
          src={movie.thumbnail_url}
          className="movie-card-img"
          onError={(event) =>
            (event.target.src =
              process.env.PUBLIC_URL + "/img/theatre.jpg")
          }
        />
        <Card.Body>
          <div>
            <Card.Title className="fw-bold text-uppercase">
              {movie.movie_name}
            </Card.Title>
            <span className="movie-rating">
              <i className="star-rating d-inline-block position-relative"></i>
              {movie.imdb_rating} / 10
            </span>
          </div>
          <div className="movie-info pt-2">
            <div className="title">
              <span>Release Date: </span>
              {movie.release_date}
            </div>
            <div className="title">
              <span>Run Time: </span> {movie.running_time}
            </div>
            <div className="title">
              <span>Language: </span> {movie.language}
            </div>
            <div className="tags-wrapper pt-3">
              {getTags(movie.tags).map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MovieCard;

MovieCard.prototype = {
  movie: PropTypes.any
}
