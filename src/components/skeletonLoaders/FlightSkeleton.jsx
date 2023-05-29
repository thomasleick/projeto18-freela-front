import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import ticket from "../../assets/ticket.png";
import airline from "../../assets/airline.png";
import departure from "../../assets/departure.png";
import arrival from "../../assets/arrival.png";
import price from "../../assets/price.png";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const FlightSkeleton = () => {
    const flight = {}
  return (
    <>
      <Div>
        <img src={ticket} alt="Passagem" />
      </Div>
      <Span>
        <Img src={airline} alt="Linha aérea" />
        <StyledSkeleton count={1} width={150} height={20} />
      </Span>
      <Span>
        <Img src={departure} alt="Partida" />
        <StyledSkeleton count={1} width={200} height={20} />
      </Span>
      <Span>
        <Img src={arrival} alt="Chegada" />
        <StyledSkeleton count={1} width={160} height={20} />
      </Span>
      <Span>
        <Img src={price} alt="Valor" />
        <StyledSkeleton count={1} width={100} height={20} />
      </Span>
    </>
  );
};
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

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
const StyledSkeleton = styled(Skeleton)`
  border-radius: 12px;
  background: linear-gradient(to right, #F5f5f555 87.267%, #f5f5f5ff 12.733%);
`;
export default FlightSkeleton;
