import React from "react";
import useFilters from "../hooks/useFilters";
import { useEffect } from "react";
import useTrip from "../hooks/useTrip";
import { axiosPrivate } from "../api/axios";
import { useState } from "react";
import FlightCard from "../components/FlightCard";
import HotelCard from "../components/HotelCard";
import styled from "styled-components";
import FinishSkeleton from "../components/skeletonLoaders/FinishSkeleton";

const Finish = () => {
  const { setMenu } = useFilters();
  const { choosenFlight, choosenHotel } = useTrip();
  const [flight, setFlight] = useState({});
  const [hotel, setHotel] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showComponents, setShowComponents] = useState(false);

  useEffect(() => {
    setMenu("finish");

    const getFlightAndHotel = async () => {
      try {
        const foundFlight = await axiosPrivate.get(`/flights/${choosenFlight}`);
        const foundHotel = await axiosPrivate.get(`/hotels/${choosenHotel}`);

        setFlight(foundFlight.data);
        setHotel(foundHotel.data);
        setShowComponents(true);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    getFlightAndHotel();
  }, []);
  return (
    <div>
      {isLoading && (
          <FinishSkeleton />
      )}
      {!isLoading && !showComponents && <p>Ocorreu algum problema!</p>}
      {!isLoading && showComponents && (
        <Container>
          <FlightCard flight={flight} />
          <HotelCard hotel={hotel} />
        </Container>
      )}
    </div>
  );
};

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    * {
        width: 500px;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
export default Finish;
