import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import useTheme from "../../hooks/useTheme";
import "react-loading-skeleton/dist/skeleton.css";

const FinishSkeleton = () => {
  const { focusInputBackground } = useTheme().colors;
  return (
    <Div>
      <Container color={focusInputBackground}>
        <StyledSkeleton count={7} width={500} height={20} />
      </Container>
      <Container color={focusInputBackground}>
        <StyledSkeleton count={7} width={500} height={20} />
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
  width: 500px;
  height: 500px;
`;
const StyledSkeleton = styled(Skeleton)`
  border-radius: 12px;
  margin-bottom: 45px;
  background: linear-gradient(to right, #F5f5f555 87.267%, #f5f5f5ff 12.733%);
`;
export default FinishSkeleton;
