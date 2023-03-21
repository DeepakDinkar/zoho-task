import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovie, getTags, getTheatresByMovieName } from "../Utils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import BookSeat from "../components/BookSeat/BookSeat";
import Error404 from "./Error404";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { movies, theatre } = useSelector((state) => state);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [show, setShow] = useState(false);

  const movie = getMovie(movies, movieId);

  if (!movie) {
    return <Error404 />;
  }

  const movieTheatres = getTheatresByMovieName(movieId, theatre);

  /**
   * Handles movie details modal close.
   */
  const handleClose = () => {
    setShow(false);
    setSelectedTheatre(null);
  };

  /**
   * Opens movie booking window.
   * @param {*} movie 
   */
  const showBookingWindow = (movie) => {
    setSelectedTheatre(movie);
    setShow(true);
  };

  return (
    <Container fluid>
      <Row xs={1} sm={1} md={1} lg={3} xl={3}>
        <Col>
          <div className="movie-details-container d-flex p-4 flex-wrap">
            <div className="image-wrapper">
              <img
                src={movie?.thumbnail_url}
                alt={movie.movie_name}
                className="h-100 w-100"
                onError={(event) =>
                  (event.target.src =
                    process.env.PUBLIC_URL + "/img/theatre.jpg")
                }
              />
            </div>
            <div className="movie-details-info">
              <h2 className="mb-0">{movie?.movie_name}</h2>
              <div className="movie-rating">
                <i className="star-rating d-inline-block position-relative"></i>
                {movie.imdb_rating} / 10
              </div>
              <div className="tags-wrapper pt-3">
                {getTags(movie.tags).map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
              <div className="py-2">
                <div className="title pb-1">{movie.release_date}</div>
                <div className="title pb-1"> {movie.running_time}</div>
                <div className="title pb-1"> {movie.language}</div>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={8} xl={8}>
          <div className="theatre-list-wrapper p-4">
            <h2>Running on theatres</h2>
            <div className="py-4 d-flex flex-wrap" style={{ gap: "1.5rem" }}>
              {movieTheatres &&
                movieTheatres.map((theatre, index) => (
                  <Card key={index} className="movie-card card-list-container">
                    <Card.Img
                      variant="top"
                      src={theatre.thumbnail_url}
                      className="movie-card-img h-100 w-100"
                      alt={theatre.theatre_name}
                      onError={(event) =>
                        (event.target.src =
                          process.env.PUBLIC_URL + "/img/theatre.jpg")
                      }
                    />
                    <Card.Body>
                      <div className="d-flex flex-column h-100 justify-content-between">
                        <Card.Title className="fw-bold text-uppercas d-flex flex-column">
                          {theatre.theatre_name}
                          <span className="movie-rating py-1">
                            <i className="star-rating d-inline-block position-relative"></i>
                            {theatre.customer_rating} / 5
                          </span>
                        </Card.Title>
                        <button
                          className="btn-book-now p-2 fw-bold no-border"
                          onClick={() => showBookingWindow(theatre)}
                        >
                          Book Now
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </div>
        </Col>
      </Row>
      {show && (
        <BookSeat
          show={show}
          handleClose={handleClose}
          bookingDetails={{
            theatre: selectedTheatre,
            movie: movie,
            availableTimes: [],
          }}
        />
      )}
    </Container>
  );
};

export default MovieDetail;

MovieDetail.prototype = {};
