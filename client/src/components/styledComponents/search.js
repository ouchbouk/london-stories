import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height:5rem;
  font-family: "Inter";
  padding: 1.2rem;
  text-decoration: none;
  border: none;
  outline: none;
  background-color: white;
  box-shadow: 0 0.2rem 2rem rgba(0, 0, 0, 0.15);

  &:focus {
    box-shadow: 0 0 0 1px #065f46;
  }

  &::placeholder {
    font-weight: 400;
    text-decoration: none;
    font-family: "Inter";
    color: #065f46;
    font-size: 2rem;
  }
`;

export const BarContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 7rem;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  margin-top: 2.5rem;
  `;
