import { createBrowserRouter } from "react-router-dom";
import Movies from "../components/Movies";
import Theatres from "../components/Theatres";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Movies />,
  },
  {
    path: "/movieDetails/:movieName",
    element: <Theatres />,
  },
]);
