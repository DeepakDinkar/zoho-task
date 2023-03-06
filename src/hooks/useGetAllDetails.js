import { useEffect, useState } from "react";
import { getAllDetails } from "../services/Api";

export const useGetAllDetails = () => {
  const [state, setState] = useState({
    data: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }));

    getAllDetails()
      .then((data) => setState((prevState) => ({ ...prevState, data: data })))
      .catch((error) =>
        setState((prevState) => ({ ...prevState, error: error }))
      )
      .finally(() =>
        setState((prevState) => ({ ...prevState, isLoading: false }))
      );
  }, []);

  return state;
};
