import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import HotelCard from "../components/HotelCard";
import PageNav from "../components/PageNav";
import useFilters from "../hooks/useFilters";

const Hotels = () => {
  const { filters, setMenu } = useFilters();
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1);

  const pageRef = useRef(undefined);
  const maxPageRef = useRef(undefined);

  useEffect(() => {
    const queryString = Object.entries(filters)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    const url = `/hotels?page=${page ?? 1}&${queryString}`;
    axios
      .get(url)
      .then((res) => {
        const { page, maxPage, hotels } = res.data;
        setHotels(hotels);
        pageRef.current = page;
        maxPageRef.current = maxPage;
      })
      .catch(console.error);
  }, [page]);

  useEffect(() => {
    const queryString = Object.entries(filters)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    const url = `/hotels?page=1&${queryString}`;
    axios
      .get(url)
      .then((res) => {
        const { page, maxPage, hotels } = res.data;
        setHotels(hotels);
        pageRef.current = page;
        maxPageRef.current = maxPage;
      })
      .catch(console.error);
  }, [filters]);

  useEffect(() => {
    setMenu("hotels");
  }, []);
  return (
    <>
      <PageContainer>
        <HotelsGrid>
          {hotels?.map((hotel) => (
            <HotelCard key={hotel.hotel_id} hotel={hotel} />
          ))}
        </HotelsGrid>
        <PageNav
          page={pageRef.current}
          maxPage={maxPageRef.current}
          setPage={setPage}
        />
      </PageContainer>
    </>
  );
};

export default Hotels;

const PageContainer = styled.div`
  display: flex;
  gap: 1em;
  padding: 10px 50px;
  margin-bottom: calc(72px + 1em);
`;

const HotelsGrid = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1em;
`;
