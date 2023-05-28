import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import styled from "styled-components";
import useFilters from "../hooks/useFilters";
import formatCurrency from "../utils/formatCurrency";
import useTheme from "../hooks/useTheme";
import ticket from "../assets/ticket.png";
import airline from "../assets/airline.png";
import departure from "../assets/departure.png";
import arrival from "../assets/arrival.png";
import price from "../assets/price.png";

const Flight = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [flight, setFlight] = useState({});
  const { id } = useParams();
  const { setMenu } = useFilters();
  const { focusInputBackground } = useTheme().colors;

  useEffect(() => {
    const getFlight = async () => {
      try {
        const response = await axiosPrivate.get(`/flights/${id}`);
        setFlight(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getFlight();
    setMenu("flight");
  }, []);

  return (
    <Container>
      <FlightContainer background={focusInputBackground}>
        {isLoading && <p>Loading...</p>}
        {!isLoading && flight && (
          <>
          <Div><img src={ticket} alt="Passagem" /></Div>
            <Span>
              <Img src={airline} alt="Linha aérea" />
              <h2>{flight.airline_name}</h2>
            </Span>
            <Span>
              <Img src={departure} alt="Partida" />
              <h4>{flight.departure_city_name}</h4>
              <h4>
                {new Date(flight.departure_time)
                  .toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", "")}
              </h4>
            </Span>
            <Span>
              <Img src={arrival} alt="Chegada" />
              <h4>{flight.destination_city_name}</h4>
              <h4>
                {new Date(flight.arrival_time)
                  .toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", "")}
              </h4>
            </Span>
            <Span>
              <Img src={price} alt="Valor" />
              <h3>{formatCurrency(flight.price)}</h3>
            </Span>
          </>
        )}
      </FlightContainer>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const FlightContainer = styled.section`
  background-color: ${(props) => props.background};
  border-radius: 25px;
  & h2 {
    font-weight: 800;
  }
  & h3 {
    font-weight: 600;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`

const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  * {
    margin: 0 10px;
  }
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
`;
export default Flight;
