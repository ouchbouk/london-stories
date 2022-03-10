import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Hero = styled.div`
  position: relative;
  height: 100vh;
  background-image: linear-gradient(
      rgba(85, 197, 122, 0.4),
      rgba(40, 180, 133, 0.4)
    ),
    url("../../nicolas-lysandrou-pncTHnpCtaM-unsplash.jpg");
  background-size: cover;
  background-position: top;
  /* position: relative; */
`;

export const Button = styled.a`
  @keyframes moveInTop {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) translateY(3rem);
    }

    80% {
      transform: translate(-50%, -50%) translateY(-2px);
    }

    100% {
      opacity: 1;
      transform: translate(-50%, -50%) translateY(0);
    }
  }

  cursor: pointer;
  display: inline-block;
  position: absolute;
  background-color: white;
  color: #065f46;
  padding: 1.5rem 4rem;
  border-radius: 10rem;
  text-decoration: none;
  top: 60%;
  left: 50%;
  text-transform: uppercase;
  transition: all 0.2s;
  transform: translate(-50%, -50%);
  animation: moveInTop 1s;
  animation-fill-mode: backwards;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 1.5rem;
    top: 50%;

  }
  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s;
    background-color: white;
  }

  &:hover {
    transform: translate(-50%, -50%) translateY(-3px);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5);
    color: #065f46;

    &::after {
      transform: scaleX(1.4) scaleY(1.6);
      opacity: 0;
    }
  }

  &:focus,
  :active {
    outline: none;
    transform: translate(-50%, -50%) translateY(-1px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }
`;

export const HeadingPrimary = styled.h1`
  display: block;
  font-size: 5rem;
  font-weight: 400;
  letter-spacing: 1rem;
  animation-name: moveInLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  color: #fff;
  text-transform: uppercase;
  backface-visibility: hidden;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 3.5rem;
    letter-spacing: 1.5px;
  }

  @keyframes moveInLeft {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) translateX(-10rem);
    }

    80% {
      transform: translate(-50%, -50%) translateX(10rem);
    }

    100% {
      opacity: 1;
      transform: translate(-50%, -50%) translateX(0);
    }
  }
`;

export const HeadingSecondary = styled.h2`
  display: block;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  animation-name: moveInRight;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  color: #fff;
  text-transform: uppercase;
  backface-visibility: hidden;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    letter-spacing: 1.1px;
    top: 38%;
  }

  @keyframes moveInRight {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) translateX(10rem);
    }

    80% {
      transform: translate(-50%, -50%) translateX(-1rem);
    }

    100% {
      opacity: 1;
      transform: translate(-50%, -50%) translateX(0);
    }
  }
`;
