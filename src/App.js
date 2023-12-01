import { BrowserRouter, Routes, Route } from "react-router-dom";
import Flights from "./Flights";
import FlightDetails from "./FlightDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Flights />} />
        <Route path="/flight/:id" element={<FlightDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
