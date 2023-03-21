import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Error404 = ({ isTheatreError = false }) => {
  const navigate = useNavigate();

  return (
    <div className="error-wrapper d-flex w-100 justify-content-center align-items-center">
      <div className="error d-flex flex-column align-items-center">
        <div className="text-center p-3">
          <span className="error-icon d-inline-block"></span>Search result not
          found
        </div>
        <button
          className="error-btn p-2 fw-bold no-border"
          onClick={() => navigate(isTheatreError ? "/theatres" : "/movies")}
        >
          Back to {isTheatreError ? "Theatres" : "Movies"}
        </button>
      </div>
    </div>
  );
};

export default Error404;

Error404.prototype = {
  isTheatreError: PropTypes.bool,
};
