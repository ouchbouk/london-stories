import styled from "styled-components";

export const Container = styled.div`
  width: 40rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 4.4rem 5.5rem;
  box-shadow: 0 0.2rem 2rem rgba(0, 0, 0, 0.15);
`;

export const Input = styled.input`
  width: 100%;
  height: 5.2rem;
  margin: 1.2rem 0;
  font-family: inherit;
  outline: none;
  border: none;
  padding: 1rem;
  font-size: 1.8rem;
  background-color: #e5e7eb;

  border: ${({ error }) => (error ? "1px solid red" : "none")};
  &:focus {
    border: 1px solid #065f46;
  }
`;

export const Label = styled.label`
  color: #212529;
  font-size: 2rem;
`;

export const Button = styled.button`
  width: 100%;
  height: 5.2rem;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  color: white;
  background-color: #065f46;
  border: none;
  font-size: 2.5rem;
  transition: all 300ms;
  margin-top: 1.8rem;
  border-radius: 10rem;
  &:hover {
    background-color: #064e3b;
  }
`;

export const GoogleButton = styled.button`
  width: 100%;
  height: 5.2rem;
  color: white;
  margin-top: 2rem;
  background-color: #de5246;
  border: none;
  font-size: 2.5rem;
  transition: all 300ms;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  &:hover {
    background-color: #b91c1c;
  }
`;

export const Title = styled.h1`
  position: relative;
  font-size: 4.2rem;
  color: #065f46;
  margin: 2rem 0 6rem 0;
  text-transform: uppercase;
`;

export const CenterText = styled.div`
  margin-top: 15px;
  text-align: center;
`;

export const Error = styled.p`
  color: red;
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
`;

export const FlashError = styled.p`
  position: absolute;
  color: red;
  font-size: 1.8rem;
  right: 50%;
  transform: translate(50%, 2rem);
`;
