import React from "react";
import { Route, Routes } from "react-router-dom";
import Error404 from "../pages/Error404";
import MovieDetail from "../pages/MovieDetail";
import Movies from "../pages/Movies";
import TheatreDetail from "../pages/TheatreDetail";
import Theatres from "../pages/Theatres";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="movies" element={<Movies />} />
      <Route path="theatres" element={<Theatres />} />
      <Route path="movie/:movieId" element={<MovieDetail />} />
      <Route path="theatre/:theatreId" element={<TheatreDetail />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoute;

AppRoute.prototype = {};
