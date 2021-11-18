import styled from "styled-components";

// SPACING SYSTEM (px):
//   2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

// FONT SIZE SYSTEM (px):
//   10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

//#e9ecef
// #065f46

export const Container = styled.div`
  width: 60rem;
  margin: 0 auto;
  margin-top: 4.8rem;
  display: flex;
  justify-content: center;
  padding: 4.4rem 5.5rem;
  box-shadow: 0 2px 2rem rgba(0, 0, 0, 0.15);

  @media (max-width: 1024px) {
    width: 50rem;
    
  }
  
  @media (max-width: 768px) {
    width: 40rem;
  }

`;

export const Input = styled.input`
  width: 100%;
  height: 5.2rem;
  margin: 1.2rem 0;
  font-family: sans-serif;
  outline: none;
  border: none;
  
  padding: 1rem;
  font-size: 1.8rem;
  background-color:#E5E7EB
;
  border: ${({ error }) => (error ? "1px solid red" : "none")};

  &:focus{
    border:1px solid #065f46;
  }
`;

export const Label = styled.label`
  color: #212529;
  font-size: 2.4rem;
  font-weight: bold;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: center;
  width: 100%;
  height: 5.2rem;
  color: white;
  background-color: #065f46;
  border: none;
  font-size: 2.5rem;
  transition: all 300ms;
  border-radius: 10rem;
  text-transform: uppercase;
  letter-spacing: 1.1px;
  &:hover {
    background-color: #064e3b;
  }
`;

export const Title = styled.h1`
  position: relative;
  font-size: 4.2rem;
  color: #065f46;
  text-transform: uppercase;
  margin: 4.2rem 0 9.2rem 0;
`;

export const CenterText = styled.div`
  text-align: center;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 16rem;
  border: none;
  outline: none;
  margin: 1.2rem 0;
  padding: 1.2rem;
  line-height: 1.3;
  background-color:#E5E7EB;
  border: ${({ error }) => (error ? "1px solid red" : "none")};
`;

export const Select = styled.select`
  width: 100%;
  height: 5.2rem;
  border: none;
  outline: none;
  margin-bottom: 3rem;
  padding: 1.2rem;
  background-color: #f3f4f6;
`;

export const FlashMessage = styled.p`
  position: absolute;
  font-size: 2.5rem;
  color: #064e3b;
  background-color: #d1fae5;
  border-radius: 1rem;
  right: 50%;
  transform: translate(50%, 2rem);
  padding: 1.2rem;
  border-radius: 1rem;
  margin-bottom: 3rem;
`;
