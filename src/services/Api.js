import axios from "axios";

const EMAIL_ID = "ddeepu794@gmail.com";
const BASE_URL = "https://zincubate.in/api/MovieTicketChecker";

const ACTION_PARAMS = Object.freeze({
  GET_ALL_DETAILS: "getAllDetails",
  BOOK_SEATS: "bookSeats",
});

export const getAllDetails = async () => {
  try {
    const response = axios.post(BASE_URL, null, {
      params: { action: ACTION_PARAMS.GET_ALL_DETAILS, user_mail_id: EMAIL_ID },
    });
    const data = (await response).data;
    return Promise.resolve(data);
  } catch (error) {
    console.log("Logged error: " + JSON.stringify(error));
    return Promise.reject(error);
  }
};

export const bookSeats = async (payload) => {
  payload = Object.assign(payload, { user_mail_id: EMAIL_ID });
  try {
    const response = axios.post(BASE_URL, payload, {
      params: {
        action: ACTION_PARAMS.BOOK_SEATS,
      },
    });
    const data = (await response).data;
    return Promise.resolve(data);
  } catch (error) {
    console.log("Logged error: " + JSON.stringify(error));
    return Promise.reject(error);
  }
};
