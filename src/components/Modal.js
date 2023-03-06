import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { bookSeats } from "../services/Api";

const BootstrapModal = ({ show, handleClose, bookingDetails }) => {
  const { theatre, availableTimes, movie } = bookingDetails;

  const getFormattedDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const [time, setTime] = useState(null);
  const [date, setDate] = useState(getFormattedDate(new Date()));

  const area = [...Array(100)];
  const [startDate, setStartDate] = useState(new Date());

  const [reservedSeats, setReservedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (time && date) {
      const seats = theatre.booked_seats
        ? theatre.booked_seats.find(
            (seat) =>
              seat.date === date &&
              seat[`show${time?.index}_time`] === time.showTime
          )
        : [];

      setReservedSeats(
        seats ? JSON.parse(seats[`show${time.index}_booked_seats`]) : []
      );
    }
  }, [time, date, theatre]);

  const updateMovieTime = (time) => {
    setTime(time);
  };

  const updateMovieDate = (date) => {
    const bookingDate = getFormattedDate(date);
    setDate(bookingDate);
  };

  const updateSeats = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats((existingSeats) =>
        existingSeats.filter((extSeat) => extSeat !== seat)
      );
    } else {
      setSelectedSeats((existingSeats) => [...existingSeats, seat]);
    }
  };

  const resetBookingDetails = () => {
    setTime(null);
    setDate(getFormattedDate(new Date()));
    setSelectedSeats([]);
    setReservedSeats([]);
  };

  const disableReservedSeats = (index) => {
    return reservedSeats
      ? reservedSeats.findIndex((seat) => seat === index) > -1
      : false;
  };

  const bookMovieSeats = () => {
    const body = {
      show_time: time?.showTime,
      movie_name: movie?.movie_name,
      theatre_name: theatre?.theatre_name,
      booked_seats: selectedSeats,
      date: date,
    };
    bookSeats(body);
  };
  return (
    <Modal
      show={show}
      onHide={() => {
        resetBookingDetails();
        handleClose();
      }}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {movie?.movie_name} - {theatre?.theatre_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="d-flex justify-content-between flex-column
           flex-sm-column flex-md-column flex-lg-row py-2 align-items-center"
        >
          <div className="time-wrapper">
            <span>Time: </span>
            {availableTimes.map((availableTime, index) => (
              <button
                key={index}
                onClick={() => updateMovieTime(availableTime)}
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
              startDate={startDate}
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
            <div className="d-flex seat-info justify-content-center">
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

export default BootstrapModal;
