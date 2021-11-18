import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 4rem;
  column-gap: 4rem;
  margin-top: 64px;
  width: 100%;
  margin: 0 auto;
  margin-top: 4.8rem;
  justify-items: center;
  /* white-space: nowrap; */

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const AttractionImg = styled.img`
  width: 100%;
  height: 16rem;
  object-fit: cover;
  transition: all 0.6s;
`;
export const AttractionCard = styled.figure`
  @keyframes moveDown {
    0% {
      opacity: 0;
      transform: translateY(-1rem);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  width: 27rem;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  cursor: pointer;
  align-self: start;
  transition: all 0.3s;
  justify-content: space-between;
  box-shadow: 0 0.2rem 2rem rgba(0, 0, 0, 0.15);


  z-index: 10;
  animation: moveDown 1s;
  .link {
    text-decoration: none;
  }

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 0.2rem 4rem rgba(0, 0, 0, 0.2);

    ${AttractionImg} {
      transform: scale(1.05);
    }
  }

  @media (max-width: 550px) {
    width: 30rem;
  }
`;

export const CardContent = styled.div`
  padding: 2rem;
  font-size: 1.6rem;
  align-self: start;

  .name {
    text-decoration: none;
    color: #065f46;
    margin-bottom: 0.6rem;
    font-size: 2.5rem;
    font-weight: 500;
  }
  .subtitle {
    font-family: "Times New Roman", Times, serif;
    text-transform: lowercase;
    color: black;
    font-size: 1.8rem;
    font-weight: 500;
    hyphens: auto;
    line-height: 2.2rem;
  }

  .subtitle::first-letter {
    text-transform: uppercase;
  }
`;

export const CenterButton = styled.div`
  width: 40rem;
  margin: 2.4rem auto;
`;
export const Button = styled.button`
  width: 100%;
  color: white;
  background-color: #065f46;
  border: none;
  border-radius: 100px;
  font-size: 2.5rem;
  transition: all 300ms;
  padding: 1.2rem 2.4rem;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: 0.15rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.15);
  transition: all 0.3s;

  &:hover {
    background-color: #064e3b;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
    transform: translateY(-0.4rem);
  }
`;

export const Title = styled.h1`
  position: relative;
  font-size: 4.2rem;
  color: #212529;
  margin: 4rem 0 10rem 0;
  color: #065f46;
  letter-spacing: 3px;
  text-transform: uppercase;
  animation: moveDown 1s;
`;

export const CenterText = styled.div`
  text-align: center;
`;

export const FlashMessage = styled.p`
  position: absolute;
  font-size: 1.8rem;
  color: #064e3b;
  top: 0;
  right: 50%;
  background-color: #d1fae5;
  padding: 1.2rem;
  border-radius: 1rem;
  transform: translate(50%, 6.5rem);
`;

export const ContinueBtn = styled.button`
  border: none;
  text-decoration: none;
  color: white;
  padding: 0.7rem 1.8rem;
  margin-left: 0.5rem;
  background-color: #065f46;
  font-family: "Lato";
  white-space: nowrap;
  margin-top: 0.4rem;
  display: inline-block;
  text-transform: uppercase;
  border-radius: 10rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  letter-spacing: 0.5px;

  &:hover {
    background-color: #064e3b;
    color: white;
    transform: translateY(-0.4rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  }
`;
