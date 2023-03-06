import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Error from "./components/Error/Error";
import Loader from "./components/Loader/Loader";
import Movies from "./components/Movies";
import { useGetAllDetails } from "./hooks/useGetAllDetails";
const App = () => {
  const { isLoading, data, error } = useGetAllDetails();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="App">
      <Navbar fixed="top" className="app-bg-primary">
        <Container>
          <Navbar.Brand className="fw-bold font-tilt-prism">
            BLOCKBUSTER
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Movies movies={data.movies} theatres={data.theatre} />
    </div>
  );
};

export default App;
