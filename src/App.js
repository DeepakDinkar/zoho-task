import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Error from "./components/Error/Error";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import { useGetAllDetails } from "./hooks/useGetAllDetails";
import AppRoute from "./routes/Route";

/**
 * !Skipped Unit Testing
 * @returns
 */
const App = () => {
  const { isLoading, error } = useGetAllDetails();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <BrowserRouter>
      <Header />
      <div className="header-fix">
        <AppRoute />
      </div>
    </BrowserRouter>
  );
};

export default App;
