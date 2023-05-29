import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import useTheme from "../../hooks/useTheme";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  const { focusInputBackground } = useTheme().colors;
  return (
    <Div>
      <Container color={focusInputBackground}>
        <StyledSkeleton count={5} width={190} height={13} />
      </Container>
    </Div>
  );
};
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${(props) => props.color};
  border-radius: 25px;

`;
const StyledSkeleton = styled(Skeleton)`
  border-radius: 25px;
  margin: 15px 5px;
  background: linear-gradient(to right, #F5f5f555 87.267%, #f5f5f5ff 12.733%);
  z-index: -1;
`;
export default CardSkeleton;
