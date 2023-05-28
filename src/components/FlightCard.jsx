import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import formatCurrency from "../utils/formatCurrency";
import { Link } from "react-router-dom";

const FlightCard = ({ flight }) => {
  const { colors } = useTheme();
  const price = formatCurrency(flight.price);
  return (
    <ContainerLink colors={colors} to={`/flight/${flight.flight_id}`}>
      <FlightDetail>
        <h2>{flight.airline_name}</h2>
        <h4>De: {flight.departure_city_name}</h4> 
        <h4>para: {flight.destination_city_name}</h4>
        <h4>Partida: {new Date(flight.departure_time).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</h4>
        <h4>Chegada: {new Date(flight.arrival_time).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</h4>
        <h3>{price}</h3>
      </FlightDetail>
    </ContainerLink>
  );
};

const ContainerLink = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.colors.focusInputBackground};
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

const PricesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  color: ${(props) => props.colors.backgroundDownHeader};

  &.discount {
    color: inherit;
    text-decoration: line-through;
  }
`;

const Brand = styled.div`
  width: fit-content;
  padding: 5px;
  color: white;
  background-color: #00000099;
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.15));
  border-radius: 10px;
  font-size: 13px;
`;

export default FlightCard;
