import "./App.css";
import Error from "./components/Error/Error";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Movies from "./components/Movies/Movies";
import { useGetAllDetails } from "./hooks/useGetAllDetails";

/**
 * !Skipped Unit Testing
 * @returns 
 */
const App = () => {
  const { isLoading, data, error } = useGetAllDetails();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <ErrorBoundary>
      <Header />
      <Movies movies={data.movies} theatres={data.theatre} />
    </ErrorBoundary>
  );
};

export default App;
