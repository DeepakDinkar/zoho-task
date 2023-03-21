import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMoviesByTheatre, getTheatre } from "../Utils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import BookSeat from "../components/BookSeat/BookSeat";
import Error404 from "./Error404";

const TheatreDetail = () => {
  const { theatreId } = useParams();
  const { movies, theatre } = useSelector((state) => state);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [show, setShow] = useState(false);

  const currentTheatre = getTheatre(theatre, theatreId);

  if (!currentTheatre) {
    return <Error404 isTheatreError={true} />;
  }

  const runningMovies = getMoviesByTheatre(currentTheatre, movies);

  const getMovie = (index) => {
    const movieName = currentTheatre[`show${index}_movie`];
    return runningMovies.find((movie) => movie.movie_name === movieName);
  };

  const theatreMovies = [];
  [...Array(4)].map((val, index) => theatreMovies.push(getMovie(index + 1)));

  /**
   * Handles movie details modal close.
   */
  const handleClose = () => {
    setShow(false);
    setSelectedMovie(null);
  };

  /**
   * Opens booking modal window.
   * @param {*} movie 
   */
  const showBookingWindow = (movie) => {
    setSelectedMovie(movie);
    setShow(true);
  };

  return (
    <Container fluid>
      <Row xs={1} sm={1} md={1} lg={3} xl={3}>
        <Col>
          <div className="movie-details-container d-flex p-4 flex-wrap">
            <div className="image-wrapper">
              <img
                src={currentTheatre?.thumbnail_url}
                alt={currentTheatre.theatre_name}
                className="h-100 w-100"
                onError={(event) =>
                  (event.target.src =
                    process.env.PUBLIC_URL + "/img/theatre.jpg")
                }
              />
            </div>
            <div className="movie-details-info">
              <h2 className="mb-0">{currentTheatre.theatre_name}</h2>
              <div className="movie-rating">
                <i className="star-rating d-inline-block position-relative"></i>
                {currentTheatre.customer_rating} / 5
              </div>
              <div className="py-2">
                <div className="title pb-1">{currentTheatre.address}</div>
                <div className="title pb-1">
                  <a className="link-secondary" href={currentTheatre.website}>
                    {currentTheatre.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={8} xl={8}>
          <div className="theatre-list-wrapper p-4">
            <h2>Running shows</h2>
            <div className="py-4 d-flex flex-wrap" style={{ gap: "1.5rem" }}>
              {runningMovies &&
                theatreMovies.map((movie, index) => (
                  <Card key={index} className="movie-card card-list-container">
                    <Card.Img
                      variant="top"
                      src={movie.thumbnail_url}
                      className="movie-card-img h-100 w-100"
                      alt={movie.movie_name}
                      onError={(event) =>
                        (event.target.src =
                          process.env.PUBLIC_URL + "/img/theatre.jpg")
                      }
                    />
                    <Card.Body>
                      <div className="d-flex flex-column h-100 justify-content-between">
                        <Card.Title className="fw-bold text-uppercase d-flex flex-column">
                          {movie.movie_name}
                          <span className="movie-rating py-1">
                            <i className="star-rating d-inline-block position-relative"></i>
                            {movie.imdb_rating} / 10
                          </span>
                          <div>
                            <small className="text-capitalize">
                              Show {index + 1}
                            </small>
                          </div>
                        </Card.Title>
                        <button
                          className="btn-book-now p-2 fw-bold no-border"
                          onClick={() => showBookingWindow(movie)}
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
            theatre: currentTheatre,
            movie: selectedMovie,
            availableTimes: [],
          }}
        />
      )}
    </Container>
  );
};

export default TheatreDetail;

TheatreDetail.prototype = {};
