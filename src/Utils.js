/**
 * Application util function added here.
 */

/**
 * Returns formatted date string from date object.
 * @param {*} date
 * @returns
 */
export const getFormattedDate = (date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Returns available times array from the shows running the theatres matching
 * with the movie.
 * @param {*} theatre
 * @param {*} movieName
 * @returns
 */
export const getAvailableTimes = (theatre, movieName) => {
  const availableTimes = [];
  if (theatre.show1_movie === movieName) {
    availableTimes.push({ showTime: theatre.show1_time, index: 1 });
  }
  if (theatre.show2_movie === movieName) {
    availableTimes.push({ showTime: theatre.show2_time, index: 2 });
  }
  if (theatre.show3_movie === movieName) {
    availableTimes.push({ showTime: theatre.show3_time, index: 3 });
  }
  if (theatre.show4_movie === movieName) {
    availableTimes.push({ showTime: theatre.show4_time, index: 4 });
  }

  return availableTimes;
};

/**
 * Returns movie information matches with the movie name.
 * @param {*} movies 
 * @param {*} movieName 
 * @returns 
 */
export const getMovie = (movies, movieName) => {
  if (movies) {
    return movies.find((m) => m.movie_name === movieName);
  }
  return null;
};

/**
 * Returns theatre index matches with the theatre name.
 * @param {*} theatres 
 * @param {*} theatreName 
 * @returns 
 */
export const getTheatreIndex = (theatres, theatreName) => {
  if (theatres) {
    return theatres.findIndex(
      (theatre) => theatre.theatre_name === theatreName
    );
  }
  return -1;
};

/**
 * Returns theatre information matches with the theatre name.
 * @param {*} theatres 
 * @param {*} theatreName 
 * @returns 
 */
export const getTheatre = (theatres, theatreName) => {
  if (theatres) {
    return theatres.find((theatre) => theatre.theatre_name === theatreName);
  }
  return null;
};

/**
 * Returns list of theatres matches with the movie name.
 * @param {*} movieName 
 * @param {*} theatres 
 * @returns 
 */
export const getTheatresByMovieName = (movieName, theatres) => {
  if (theatres) {
    return theatres.filter(
      (theatre) =>
        theatre.show1_movie === movieName ||
        theatre.show2_movie === movieName ||
        theatre.show3_movie === movieName ||
        theatre.show4_movie === movieName
    );
  }
  return [];
};

/**
 * Returns list of movies matches with the theatre name.
 * @param {*} theatre 
 * @param {*} movies 
 * @returns 
 */
export const getMoviesByTheatre = (theatre, movies) => {
  if (movies && theatre) {
    return movies.filter(
      ({ movie_name }) =>
        theatre.show1_movie === movie_name ||
        theatre.show2_movie === movie_name ||
        theatre.show3_movie === movie_name ||
        theatre.show4_movie === movie_name
    );
  }
  return [];
};

/**
 * Returns tags array from tags string array.
 * @param {*} tags
 * @returns
 */
export const getTags = (tags) => {
  return tags ? tags.split(",") : [];
};

/**
 * Updates booked seats to the relevant theatre information.
 * @param {*} payload 
 * @param {*} theatres 
 * @returns 
 */
export const getUpdatedSeats = (payload, theatres) => {
  const index = getTheatreIndex(theatres, payload.theatre_name);
  let bookedSeats = theatres[index].booked_seats;

  const TIME_KEY = `show${payload.timeIndex}_time`;
  const SEATS_KEY = `show${payload.timeIndex}_booked_seats`;

  payload[SEATS_KEY] = JSON.stringify(payload[SEATS_KEY]);

  if (bookedSeats) {
    const dateIndex = bookedSeats.findIndex(
      (seat) => seat.date === payload.date
    );

    if (dateIndex > -1) {
      const bookedSeatObj = bookedSeats[dateIndex][TIME_KEY];
      if (bookedSeatObj) {
        let seats = updateExistingSeats(
          bookedSeats,
          dateIndex,
          SEATS_KEY,
          payload
        );
        bookedSeats[dateIndex][SEATS_KEY] = convertArrayToString(seats);
      } else {
        bookedSeats[dateIndex][TIME_KEY] = payload[TIME_KEY];
        bookedSeats[dateIndex][SEATS_KEY] = JSON.stringify(payload[SEATS_KEY]);
      }
    } else {
      bookedSeats.push(payload);
    }
  } else {
    bookedSeats = [{ ...payload }];
  }

  return theatres;
};

/**
 * Updates seats with the existing theatre information.
 * @param {*} bookedSeats 
 * @param {*} dateIndex 
 * @param {*} SEATS_KEY 
 * @param {*} payload 
 * @returns 
 */
const updateExistingSeats = (bookedSeats, dateIndex, SEATS_KEY, payload) => {
  let seats = bookedSeats[dateIndex][SEATS_KEY];
  const existingReservedSeats = getArrayFromString(seats);
  seats = [
    ...JSON.parse(existingReservedSeats),
    ...JSON.parse(payload[SEATS_KEY]),
  ];
  return seats;
};

/**
 * Util method to get array from string array.
 * @param {*} array 
 * @returns 
 */
export const getArrayFromString = (array) => {
  if (Array.isArray(array)) {
    return array;
  }
  if (array && array.charAt(1) === ",") {
    array = array.slice(0, 1) + array.slice(2);
  }
  return array;
};

/**
 * Util method to convert array to string array.
 * @param {*} array 
 * @returns 
 */
export const convertArrayToString = (array) => {
  return Array.isArray(array) ? JSON.stringify(array) : array;
};
