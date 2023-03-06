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
