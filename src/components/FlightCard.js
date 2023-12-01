import React from "react";
import { Alert, Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const FlightCard = ({ flight }) => {
  const scheduleTime = flight.scheduleTime.substring(0, 5);

  const extractTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const actualTime = extractTime(flight.actualLandingTime);

  function getOnlyDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  return (
    <Card style={{ width: "100%", margin: "10px" }}>
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Text>
            {flight.flightDirection === "A"
              ? actualTime
                ? actualTime
                : "-"
              : scheduleTime
              ? scheduleTime
              : "-"}
          </Card.Text>
        </div>
        <div>
          <Card.Title>{flight.flightName}</Card.Title>
          <Card.Text>Flight Number: {flight.flightNumber}</Card.Text>
        </div>
        <div>
          <Card.Text>Gate: {flight.gate}</Card.Text>
        </div>

        <Link to={`flight/${flight.id}`} className="btn btn-primary">
          Details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default FlightCard;
