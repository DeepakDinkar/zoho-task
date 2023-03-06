import React from "react";
import { APP_ERROR } from "../../Constants";

const Error = () => {
  return (
    <div className="error-wrapper d-flex w-100 justify-content-center align-items-center">
      <div className="error">
        <span className="error-icon d-inline-block"></span>
        {APP_ERROR}
      </div>
    </div>
  );
};

export default Error;
