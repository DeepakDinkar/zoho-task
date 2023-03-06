import PropTypes from "prop-types";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getAvailableTimes } from "../../Utils";
import BookSeat from "../BookSeat/BookSeat";

const Movies = ({ movies = [], theatres = [] }) => {
  const [show, setShow] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    theatre: null,
    movie: null,
    availableTimes: [],
  });

  /**
   * Handles movie details modal close.
   */
  const handleClose = () => {
    setShow(false);
  };

  /**
   * !IMPORTANT - Assuming 1 movie is played in 1 theatre as given in the response.
   * Returns selected movie shown in the theatre
   * @param {*} movie (Movie object).
   */
  const getMovieTheatre = (movie) => {
    const theatre = getTheatre(movie.movie_name);
    const availableTimes = getAvailableTimes(theatre, movie.movie_name);

    setBookingDetails((details) => ({
      ...details,
      theatre: theatre,
      movie: movie,
      availableTimes: availableTimes,
    }));
    setShow(true);
  };

  /**
   * Returns tags array from tags string array.
   * @param {*} tags
   * @returns
   */
  const getTags = (tags) => {
    return tags ? tags.split(",") : [];
  };

  /**
   * Returns theatre from the selected movie name.
   * @param {*} movieName
   * @returns
   */
  const getTheatre = (movieName) => {
    return theatres.find(
      (theatre) =>
        theatre.show1_movie === movieName ||
        theatre.show2_movie === movieName ||
        theatre.show3_movie === movieName ||
        theatre.show4_movie === movieName
    );
  };

  return (
    <Container fluid className="wrapper px-3 py-4">
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {movies.map((movie) => (
          <Col onClick={() => getMovieTheatre(movie)} key={movie.movie_name}>
            <Card className="movie-card">
              <Card.Img
                variant="top"
                src={movie.thumbnail_url}
                className="movie-card-img"
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
        ))}
      </Row>
      <BookSeat
        show={show}
        handleClose={handleClose}
        bookingDetails={bookingDetails}
      />
    </Container>
  );
};

export default Movies;

Movies.propTypes = {
  movies: PropTypes.array,
  theatre: PropTypes.array,
};
