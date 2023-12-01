import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Card, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import FlightCard from "./components/FlightCard";

function Flights() {
  const [selectedTab, setSelectedTab] = useState("departures");
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  const [filteredData, setFilteredData] = useState([]);

  const [selectedDate, setSeledtedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const flightsContainerRef = useRef(null);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();

    const filteredDepartures = data.filter(
      (item) =>
        item?.flightDirection === "D" &&
        item.flightName.toLowerCase().includes(text)
    );
    const filteredArrivals = data.filter(
      (item) =>
        item?.flightDirection === "A" &&
        item.flightName.toLowerCase().includes(text)
    );

    if (text == "") {
      setFilteredData(data);
    } else {
      if (selectedTab === "departures") {
        setFilteredData(filteredDepartures);
      } else if (selectedTab === "arrivals") {
        setFilteredData(filteredArrivals);
      }
    }
  };

  useEffect(() => {
    const fetchFlightsByDate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/flights/1/${selectedDate}`
        );
        const flightsByDate = response.data.flights;
        setFilteredData(flightsByDate);
        setData(flightsByDate);
        setPage(2);
      } catch (error) {
        console.error("Error fetching data by date:", error);
      }
    };

    fetchFlightsByDate();
  }, [selectedDate]);

  const handleListMoreFlights = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/flights/${page}/${selectedDate}`
      );
      const newFlights = response.data.flights;

      const filteredNewFlights = newFlights.filter((flight) => {
        if (selectedTab === "departures") {
          return flight.flightDirection === "D";
        } else if (selectedTab === "arrivals") {
          return flight.flightDirection === "A";
        }
        return true;
      });

      setData((prevData) => [...prevData, ...filteredNewFlights]);
      setFilteredData((prevData) => [...prevData, ...filteredNewFlights]);
      setPage((prevPage) => prevPage + 1);

      if (flightsContainerRef.current) {
        flightsContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const response = await axios.get(
          `http://localhost:3001/api/flights/1/${today}`
        );

        setData(response.data.flights);
        setFilteredData(response.data.flights);
        setPage(2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFlights();
  }, []);

  const getDaysArrayFromStartOfMonth = (date) => {
    const days = [];

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const currentDate = new Date(lastDayOfMonth);

    while (currentDate >= firstDayOfMonth) {
      days.unshift(new Date(currentDate).toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return days;
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const days = getDaysArrayFromStartOfMonth(today);

  function formatFlightDate(date) {
    const options = { month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <div className="App container mt-3">
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Control
              as="select"
              value={selectedDate}
              custom
              onChange={(e) => setSeledtedDate(e.target.value)}
            >
              <option value={yesterday.toISOString().slice(0, 10)}>
                Yesterday
              </option>
              <option value={tomorrow.toISOString().slice(0, 10)}>
                Tomorrow
              </option>
              <option value={today.toISOString().slice(0, 10)}>Today</option>
              {days.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={handleSearch}
            />
          </Form.Group>
        </Col>
      </Row>
      {filteredData && filteredData.length > 0 && (
        <Tabs
          activeKey={selectedTab}
          onSelect={(k) => {
            setSelectedTab(k);
            if (k === "departures") {
              setFilteredData([
                ...filteredData,
                filteredData.filter((item) => item?.flightDirection === "D"),
              ]);
              setSeledtedDate(new Date().toISOString().slice(0, 10));
            }
            if (k === "arrivals") {
              setFilteredData([
                ...filteredData,
                filteredData.filter((item) => item?.flightDirection === "A"),
              ]);
              setSeledtedDate(new Date().toISOString().slice(0, 10));
            }
            setPage(1);
          }}
        >
          <Tab eventKey="departures" title="Departures">
            <div className="card-container d-flex flex-column">
              {filteredData
                .filter((item) => item?.flightDirection === "D")
                .map((flight) => (
                  <div key={flight.id} className="pt-3">
                    <Card.Header>
                      {formatFlightDate(flight.scheduleDate)}
                    </Card.Header>
                    <FlightCard key={flight.id} flight={flight} />
                  </div>
                ))}
            </div>
          </Tab>
          <Tab eventKey="arrivals" title="Arrivals">
            <div className="card-container d-flex flex-column">
              {filteredData
                .filter((item) => item?.flightDirection === "A")
                .map((flight) => (
                  <div key={flight.id} className="pt-3">
                    <Card.Header>
                      {formatFlightDate(flight.scheduleDate)}
                    </Card.Header>
                    <FlightCard key={flight.id} flight={flight} />
                  </div>
                ))}
            </div>
          </Tab>
        </Tabs>
      )}

      <div ref={flightsContainerRef} />

      <Button
        className="mt-3 mb-3 w-100"
        onClick={() => handleListMoreFlights()}
      >
        Show More Flights
      </Button>
    </div>
  );
}

export default Flights;
