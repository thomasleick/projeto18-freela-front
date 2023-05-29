import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import useTheme from "../../hooks/useTheme";

const HotelSkeleton = () => {
  const { focusInputBackground, secondaryText } = useTheme().colors;
  const hotel = { photos: [{}, {}, {}, {}], amenities: "1, 2, 3, 4, 5, 6, 7" };
  return (
    <>
      <H1 fontColor={secondaryText}>{hotel.hotel_name}</H1>
      <PhotoContainer background={focusInputBackground}>
        {hotel.photos.map((_, id) => (
          <StyledSkeleton key={id} />
        ))}
      </PhotoContainer>
      <Horizontal background={focusInputBackground}>
        <div>
          <h2>Sobre o hotel</h2>
          <StyledSkeleton count={8} width={300} height={20} />
        </div>
        <div>
          <h2>Comodidades</h2>
          <List>
            {hotel.amenities.split(",").map((amenity, index) => (
              <ListItem key={index}>
                <StyledSkeleton count={1} width={300} height={20} />
              </ListItem>
            ))}
          </List>
        </div>
      </Horizontal>
    </>
  );
};
const List = styled.ul`
  list-style: disc;
  margin-left: 1em;
`;

const ListItem = styled.li`
  margin-bottom: 0.5em;
  font-size: 18px;
`;

const PhotoContainer = styled.section`
  background-color: ${(props) => props.background};
  width: calc(100vw - 330px);
  padding: 25px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  span {
    width: calc((100vw - 300px) / 4 - 25px);
    height: calc((100vw - 525px) / 4 - 25px);
    margin: 0 12.5px;
  }
`;

const H1 = styled.h1`
  margin: 25px;
  font-weight: 700;
  font-size: 36px;
  color: ${(props) => props.fontColor};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Horizontal = styled.div`
  width: calc(100vw - 290px);
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    background-color: ${(props) => props.background};
    padding: 25px;
    border-radius: 25px;
    width: calc(50% - 250px);
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h2 {
      font-weight: 600;
      font-size: 28px;
      margin-bottom: 25px;
    }
    p {
      font-size: 18px;
      &:first-letter {
        margin-left: 3em;
      }
    }
  }
`;
const StyledSkeleton = styled(Skeleton)`
  border-radius: 12px;
  margin-bottom: 10px;
  background: linear-gradient(to right, #f5f5f555 87.267%, #f5f5f5ff 12.733%);
`;
export default HotelSkeleton;
