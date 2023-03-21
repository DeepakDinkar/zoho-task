import React from "react";
import { useSelector } from "react-redux";
import ListLayout from "../common/ListLayout";
import MovieCard from "../components/MovieCard/MovieCard";

const Movies = () => {
  const movies = useSelector((s) => s.movies);

  if (!movies || movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <ListLayout>
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </ListLayout>
  );
};

export default Movies;

Movies.prototype = {};
