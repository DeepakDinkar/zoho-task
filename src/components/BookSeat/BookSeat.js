import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { bookSeats } from "../../services/Api";
import Alert from "react-bootstrap/Alert";
import { getFormattedDate } from "../../Utils";
import PropTypes from "prop-types";
import TheatreInfo from "../Theatre-info/TheatreInfo";
import {
  ALERT_TYPES,
  BOOK_SEAT_FAILURE,
  SEAT_ERROR,
  TIME_ERROR,
} from "../../Constants";

const BookSeat = ({ show, handleClose, bookingDetails }) => {
  const area = [...Array(100)];
  const { theatre, availableTimes, movie } = bookingDetails;

  const [time, setTime] = useState(null);
  const [date, setDate] = useState(getFormattedDate(new Date()));
  const [startDate, setStartDate] = useState(new Date());
  const [reservedSeats, setReservedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: null,
    type: null,
  });

  /**
   * Effect runs whenever the time or date is changed.
   * Reserved seats can't be reflected if you close the modal and open again
   * Only refreshing the page will reflect the latest booked_seats value.
   */
  useEffect(() => {
    if (time && date) {
      setSelectedSeats([]); // Resets selected seats whenever time and date is changed.
      const seats = theatre.booked_seats
        ? theatre.booked_seats.find(
            (seat) =>
              seat.date === date &&
              seat[`show${time?.index}_time`] === time.showTime
          )
        : [];

      if (seats) {
        let bookedSeats = seats[`show${time.index}_booked_seats`];
        if (bookedSeats && bookedSeats.charAt(1) === ",") {
          bookedSeats = bookedSeats.slice(0, 1) + bookedSeats.slice(2);
        }
        setReservedSeats(JSON.parse(bookedSeats));
      } else {
        setReservedSeats([]);
      }
    }
  }, [time, date, theatre]);

  /**
   * Updates date when user is selected.
   * @param {*} date
   */
  const updateMovieDate = (date) => {
    const bookingDate = getFormattedDate(date);
    setDate(bookingDate);
  };

  /**
   * Updates seats whenever user selects the seats.
   * @param {*} seat
   */
  const updateSeats = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats((existingSeats) =>
        existingSeats.filter((extSeat) => extSeat !== seat)
      );
    } else {
      setSelectedSeats((existingSeats) => [...existingSeats, seat]);
    }
  };

  /**
   * Resets booking details when user closes the modal.
   */
  const resetBookingDetails = () => {
    setTime(null);
    setDate(getFormattedDate(new Date()));
    setStartDate(new Date());
    setSelectedSeats([]);
    setReservedSeats([]);
    setShowAlert(false);
  };

  /**
   * Disables reserved seats.
   * @param {*} index
   * @returns
   */
  const disableReservedSeats = (index) => {
    return reservedSeats
      ? reservedSeats.findIndex((seat) => seat === index) > -1
      : false;
  };

  /**
   * Validates if both time, date and seats are selected.
   * Performs the booking process.
   * @returns
   */
  const bookMovieSeats = () => {
    setShowAlert(false);

    if (!time) {
      setAlert({ message: TIME_ERROR, type: ALERT_TYPES.DANGER });
      return setShowAlert(true);
    }

    if (selectedSeats.length === 0) {
      setAlert({ message: SEAT_ERROR, type: ALERT_TYPES.DANGER });
      return setShowAlert(true);
    }

    bookSeats(getPayload())
      .then(({ message }) => handleSuccess(message))
      .catch(() => handleFailure());
  };

  /**
   * Constructs and return payload for booking.
   * @returns
   */
  const getPayload = () => {
    return {
      show_time: time?.showTime,
      movie_name: movie?.movie_name,
      theatre_name: theatre?.theatre_name,
      booked_seats: selectedSeats,
      date: date,
    };
  };

  /**
   * Handles booking success --> Need to move to custom hook.
   * @param {*} message
   */
  const handleSuccess = (message) => {
    if (message.includes(ALERT_TYPES.SUCCESS)) {
      setReservedSeats([...reservedSeats, ...selectedSeats]);
      setSelectedSeats([]);
    }
    setAlert({
      message: message,
      type: message.includes(ALERT_TYPES.SUCCESS)
        ? ALERT_TYPES.SUCCESS
        : ALERT_TYPES.DANGER,
    });
    setShowAlert(true);
  };

  /**
   * Handles booking failure. --> Need to move to custom hook.
   */
  const handleFailure = () => {
    setAlert({
      message: BOOK_SEAT_FAILURE,
      type: ALERT_TYPES.DANGER,
    });
    setShowAlert(false);
  };

  /**
   * Resets all booking details and closes the modal.
   */
  const closeModal = () => {
    resetBookingDetails();
    handleClose();
  };

  return (
    <Modal show={show} backdrop="static" keyboard={false} size="lg">
      <Modal.Body>
        <div className="modal-close-wrapper d-flex w-100 justify-content-between">
          <span className="movie-title text-uppercase fw-bold">
            {movie?.movie_name}
          </span>
          <button className="close" onClick={closeModal}>
            X
          </button>
        </div>
        <TheatreInfo theatre={theatre} />
        <div
          className="d-flex justify-content-between flex-column
           flex-sm-column flex-md-column flex-lg-row py-2 align-items-center"
        >
          <div className="time-wrapper">
            <span>Time: </span>
            {availableTimes.map((availableTime, index) => (
              <button
                key={index}
                onClick={() => setTime(availableTime)}
                className={`btn btn-time mx-2 ${
                  time?.showTime === availableTime.showTime ? "active" : ""
                }`}
              >
                {availableTime.showTime}
              </button>
            ))}
          </div>
          <div className="date-wrapper d-flex py-2">
            <span>Date: </span>
            <DatePicker
              wrapperClassName="date-picker"
              startDate={startDate}
              minDate={new Date()}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                updateMovieDate(date);
              }}
            />
          </div>
        </div>
        <div>
          <>
            <div className="seat-layout">
              {area.map((a, index) => (
                <button
                  key={index}
                  className={`btn seat m-2 text-center ${
                    selectedSeats.includes(index + 1)
                      ? "seat-selected"
                      : "seat-available"
                  }`}
                  onClick={() => updateSeats(index + 1)}
                  disabled={disableReservedSeats(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="d-flex seat-info justify-content-center py-3">
              <span className="s-available text-uppercase position-relative px-4">
                Available
              </span>
              <span className="s-selected text-uppercase position-relative px-4">
                Selected
              </span>
              <span className="s-taken text-uppercase position-relative px-4">
                Taken
              </span>
            </div>
            <Alert show={showAlert} variant={alert?.type}>
              <div>{alert?.message}</div>
            </Alert>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-book-seat text-uppercase fw-bold my-4"
                onClick={() => bookMovieSeats()}
              >
                Book Seats
              </button>
            </div>
          </>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BookSeat;

BookSeat.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  bookingDetails: PropTypes.any,
};
