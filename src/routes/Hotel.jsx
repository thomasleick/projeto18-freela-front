import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import styled from "styled-components";
import useFilters from "../hooks/useFilters";
import useTheme from "../hooks/useTheme";
import useTrip from "../hooks/useTrip";

const Hotel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hotel, setHotel] = useState({});
  const { id } = useParams();
  const { setMenu } = useFilters();
  const { focusInputBackground, secondaryText } = useTheme().colors;
  const { setCardCity } = useTrip();

  useEffect(() => {
    const getHotel = async () => {
      try {
        const response = await axiosPrivate.get(`/hotels/${id}`);
        setHotel(response.data);
        setCardCity(response.data.city_name);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getHotel();
    setMenu("hotel");
  }, []);

  return (
    <Container>
      {isLoading && <p>Loading...</p>}
      {!isLoading && hotel && (
        <>
          <H1 fontColor={secondaryText}>{hotel.hotel_name}</H1>
          <PhotoContainer background={focusInputBackground}>
            {hotel.photos.map((photo, id) => (
              <img key={id} src={photo.photo_url} alt={`Foto ${id}`} />
            ))}
          </PhotoContainer>
          <Horizontal background={focusInputBackground}>
            <div>
              <h2>Sobre o hotel</h2>
              <p>{hotel.description}</p>
            </div>
            <div>
              <h2>Comodidades</h2>
              <List>
                {hotel.amenities.split(",").map((amenity, index) => (
                  <ListItem key={index}>{amenity.trim()}</ListItem>
                ))}
              </List>
            </div>
          </Horizontal>
        </>
      )}
    </Container>
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
const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100dvh - 150px);
`;
const PhotoContainer = styled.section`
  background-color: ${(props) => props.background};
  width: calc(100vw - 330px);
  padding: 25px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: calc((100vw - 300px) / 4 - 25px);
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
export default Hotel;
