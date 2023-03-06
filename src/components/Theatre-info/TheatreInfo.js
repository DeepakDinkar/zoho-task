import React from "react";
import PropTypes from "prop-types";

const TheatreInfo = ({ theatre }) => {
  return (
    <div className="theatre-info py-2">
      <div className="title">
        <span>Theatre Name: </span>
        {theatre?.theatre_name}
      </div>
      <div className="title">
        <span>Customer Rating: </span>
        {theatre?.customer_rating}
        <i className="star-rating d-inline-block position-relative"></i>
      </div>
      <div className="title">
        <span>Address: </span>
        {theatre?.address}
      </div>
      <div className="title">
        <span>Website: </span>
        <a href={theatre?.website}>{theatre?.website}</a>
      </div>
    </div>
  );
};

export default TheatreInfo;

TheatreInfo.propTypes = {
  theatre: PropTypes.any,
};
