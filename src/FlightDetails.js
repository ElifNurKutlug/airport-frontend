import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

const FlightDetails = () => {
  const [flightDetails, setFlightDetails] = useState(null);
  const [airlinesData, setAirlinesData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/flights/${id}`
        );

        setFlightDetails(response.data.flightDetails);
        setAirlinesData(response.data.airlines);
      } catch (error) {
        console.error("Error fetching flight details:", error);
      }
    };

    fetchFlightDetails();
  }, [id]);

  if (!flightDetails) {
    return <div>Loading...</div>;
  }

  const extractTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const actualTime = extractTime(flightDetails.actualLandingTime);

  return (
    airlinesData &&
    flightDetails && (
      <div className="container w-100 h-100 d-flex p-4 flex-column justify-content-center align-items-center">
        <h6 className="text-left d-flex w-100">
          {flightDetails.flightName ?? "-"}
        </h6>
        <Card className="d-flex w-100">
          <Card.Body className="d-flex justify-content-between  align-items-center">
            <Card.Title>{airlinesData.publicName ?? "-"}</Card.Title>

            <div className="d-flex flex-column">
              <Card.Text>Date</Card.Text>

              <Card.Text style={{ fontWeight: "bold" }}>
                {flightDetails.scheduleDate ?? "-"}
              </Card.Text>
            </div>

            <div className="d-flex flex-column">
              <Card.Text>
                {flightDetails.flightDirection === "A"
                  ? "Arrival Time"
                  : "Departure Time"}
              </Card.Text>

              <Card.Text style={{ fontWeight: "bold" }}>
                {flightDetails.flightDirection === "A"
                  ? actualTime
                  : flightDetails.scheduleTime}
              </Card.Text>
            </div>

            <div className="d-flex flex-column">
              <Card.Text>
                {flightDetails.flightDirection === "A"
                  ? "Arrivals"
                  : "Departures"}
              </Card.Text>

              <Card.Text style={{ fontWeight: "bold" }}>
                {flightDetails.terminal ?? "-"}
              </Card.Text>
            </div>

            <div className="d-flex flex-column">
              <Card.Text>Gate</Card.Text>

              <Card.Text style={{ fontWeight: "bold" }}>
                <Badge color="primary">{flightDetails.gate ?? "-"}</Badge>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  );
};

export default FlightDetails;
