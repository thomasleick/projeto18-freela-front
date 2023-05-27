import styled from "styled-components";
import {
  BsChevronDoubleLeft,
  BsChevronLeft,
  BsChevronDoubleRight,
  BsChevronRight,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const PageNav = ({ page, maxPage, category }) => {
  const { colors } = useTheme();
  const categoryQuery = category ? `&category=${category}` : "";

  return (
    <Container>
      <PageNavButton colors={colors} disabled={page === 1}>
        <Link to={`/?page=1${categoryQuery}`}>
          <BsChevronDoubleLeft />
        </Link>
      </PageNavButton>
      <PageNavButton colors={colors} disabled={page === 1}>
        <Link to={`/?page=${page - 1}${categoryQuery}`}>
          <BsChevronLeft />
        </Link>
      </PageNavButton>
      {page && (
        <span>
          {page} de {maxPage}
        </span>
      )}
      <PageNavButton colors={colors} disabled={page === maxPage}>
        <Link to={`/?page=${page + 1}${categoryQuery}`}>
          <BsChevronRight />
        </Link>
      </PageNavButton>
      <PageNavButton colors={colors} disabled={page === maxPage}>
        <Link to={`/?page=${maxPage}${categoryQuery}`}>
          <BsChevronDoubleRight />
        </Link>
      </PageNavButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 1em;
  box-sizing: content-box;
  height: 40px;
  padding: 1em;

  background-color: white;
  border-radius: 36px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  // filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.15));

  position: fixed;
  left: calc(50% + 125px);
  bottom: 1em;
  transform: translateX(-50%);

  user-select: none;
  span {
  }
`;

const PageNavButton = styled.button`
  display: flex;
  justify-content: center;
  margin: 0;
  align-items: center;
  width: 50px;
  height: 100%;
  aspect-ratio: 1 / 1;
  color: white;
  border: none;
  border-radius: 100%;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.15));

  &:hover {
    cursor: pointer;
    filter: unset;
  }

  &:disabled {
    filter: brightness(90%);
    pointer-events: none;
  }

  & a {
    display: flex;
    align-items: center;
  }

  & svg {
    height: 20px;
    width: 100%;
  }
`;

export default PageNav;
