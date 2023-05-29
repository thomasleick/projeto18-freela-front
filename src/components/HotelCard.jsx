import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import formatCurrency from "../utils/formatCurrency";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const { colors } = useTheme();
  const price = formatCurrency(hotel.price_per_night);
  return (
    <ContainerLink colors={colors} to={`/hotel/${hotel.hotel_id}`}>
      <HotelDetail>
        <h2>{hotel.hotel_name}</h2>
        <p>{hotel.description}</p>
        <h4>{hotel.city_name}</h4> 
        <h3>{price}</h3>
      </HotelDetail>
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

const HotelDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  padding: 10px;
  overflow: hidden;

  & h2 {
    font-weight: 800;
    text-align: center;
  }
  & h3 {
    font-weight: 600;
  }
  & p{
    text-align: center;
  }
`;

export default HotelCard;
