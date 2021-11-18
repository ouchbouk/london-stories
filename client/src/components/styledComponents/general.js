import styled, { keyframes } from "styled-components";

export const MainContainer = styled.div`
  position: relative;
  width: 80%;
  margin: 4rem auto 7rem auto;
`;

const loadingKF = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingRing = styled.div`
  display: inline-block;
  width: 38px;
  height: 38px;

  &::after {
    content: " ";
    display: inline-block;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${loadingKF} 1.2s linear infinite;
  }
`;
