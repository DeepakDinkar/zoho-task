import { getUpdatedSeats } from "../Utils";
import { INITIAL_LOAD_SUCCESS, UPDATE_RESERVED_SEATS } from "./actions";

const initialState = {
  movies: [],
  theatre: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_LOAD_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_RESERVED_SEATS: {
      return {
        ...state,
        theatre: getUpdatedSeats(action.payload, state.theatre)
      }
    }

    default:
      return state;
  }
};

export default movieReducer;
