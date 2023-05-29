import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import formatCurrency from "../utils/formatCurrency";
import { Link } from "react-router-dom";

const FlightCard = ({ flight }) => {
  const { colors } = useTheme();
  const price = formatCurrency(flight.price);
  return (
    <ContainerLink colors={colors} to={`/flights/${flight.flight_id}`}>
      <FlightDetail>
        <h2>{flight.airline_name}</h2>
        <h4>De: {flight.departure_city_name}</h4>
        <h4>para: {flight.destination_city_name}</h4>
        <h4>
          Partida:{" "}
          {new Date(flight.departure_time)
            .toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace(",", "")}
        </h4>
        <h4>
          Chegada:{" "}
          {new Date(flight.arrival_time)
            .toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace(",", "")}
        </h4>
        <h3>{price}</h3>
      </FlightDetail>
    </ContainerLink>
  );
};

const ContainerLink = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.colors.focusInputBackground};
  border: 1px solid transparent;
  border-radius: 25px;

  & img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: scale-down;
  }

  &:hover {
    border-color: ${(props) => props.colors.backgroundDownHeader};
  }
`;

const FlightDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  padding: 10px;
  overflow: hidden;

  & h2 {
    flex: 1;
    font-weight: 800;
    text-align: center;
  }
  & h3 {
    font-weight: 600;
  }
`;

export default FlightCard;
