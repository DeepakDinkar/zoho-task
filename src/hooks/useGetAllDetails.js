import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDetails } from "../services/Api";
import { INITIAL_LOAD_SUCCESS } from "../store/actions";

export const useGetAllDetails = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }));

    getAllDetails()
      .then((data) => {
        dispatch({ type: INITIAL_LOAD_SUCCESS, payload: data });
      })
      .catch((error) =>
        setState((prevState) => ({ ...prevState, error: error }))
      )
      .finally(() =>
        setState((prevState) => ({ ...prevState, isLoading: false }))
      );
  }, [dispatch]);

  return state;
};
