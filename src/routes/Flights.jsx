import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "../api/axios";
import FlightCard from "../components/FlightCard";
import PageNav from "../components/PageNav";
import useFilters from "../hooks/useFilters";
import useTrip from "../hooks/useTrip";
import CardSkeleton from "../components/skeletonLoaders/CardSkeleton";

const Flights = () => {
  const { filters, setMenu } = useFilters();
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);
  const { choosenCity } = useTrip();

  const pageRef = useRef(undefined);
  const maxPageRef = useRef(undefined);

  useEffect(() => {
    if (firstLoad) return;
    setIsLoading(true);
    const queryString = Object.entries(filters)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    const url = `/flights?page=${page ?? 1}&${queryString}`;
    axios
      .get(url)
      .then((res) => {
        const { page, maxPage, flights } = res.data;
        setFlights(flights);
        pageRef.current = page;
        maxPageRef.current = maxPage;
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  }, [page]);

  useEffect(() => {
    if (firstLoad) return;
    setIsLoading(true);
    const queryString = Object.entries(filters)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    const url = `/flights?page=1&${queryString}`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        const { page, maxPage, flights } = res.data;
        setFlights(flights);
        pageRef.current = page;
        maxPageRef.current = maxPage;
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  }, [filters]);

  useEffect(() => {
    setIsLoading(true);
    setMenu("flights");
    setFirstLoad(false);
    let queryString = "";
    if (choosenCity) {
      queryString += `destinationCities=${choosenCity.value}`;
    }
    const url = `/flights?page=${page ?? 1}&${queryString}`;
    axios
      .get(url)
      .then((res) => {
        const { page, maxPage, flights } = res.data;
        setFlights(flights);
        pageRef.current = page;
        maxPageRef.current = maxPage;
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  }, []);
  return (
    <>
      <PageContainer>
        <FlightsGrid>
          {isLoading &&
            Array(15)
              .fill()
              .map((_, index) => <CardSkeleton key={index} />)}
          {!isLoading &&
            flights?.map((flight) => (
              <FlightCard key={flight.flight_id} flight={flight} />
            ))}
        </FlightsGrid>
        <PageNav
          page={pageRef.current}
          maxPage={maxPageRef.current}
          setPage={setPage}
        />
      </PageContainer>
    </>
  );
};

export default Flights;

const PageContainer = styled.div`
  display: flex;
  gap: 1em;
  padding: 10px 50px;
  margin-bottom: calc(72px + 1em);
`;

const FlightsGrid = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1em;
`;
