import React from "react";
import { useSelector } from "react-redux";
import ListLayout from "../common/ListLayout";
import TheatreCard from "../components/TheatreCard/TheatreCard";

const Theatres = () => {
  const theatres = useSelector((s) => s.theatre);

  if (!theatres || theatres.length === 0) {
    return <div>No theatres found</div>;
  }

  return (
    <ListLayout>
      {theatres.map((theatre, index) => (
        <TheatreCard key={index} theatre={theatre} />
      ))}
    </ListLayout>
  );
};

export default Theatres;

Theatres.prototype = {};
