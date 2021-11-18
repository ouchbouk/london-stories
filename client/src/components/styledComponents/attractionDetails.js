import styled from "styled-components";
import {
  IoFlagSharp,
  IoStarSharp,
  IoListSharp,
  IoArrowBackSharp,
  IoArrowForwardSharp,
  IoPersonCircleSharp,
  IoCloseSharp,
} from "react-icons/io5";

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 4.8rem;
  margin-top: 3.2rem;
  margin-bottom: 4.8rem;
  animation: moveDown 1s;
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Title = styled.h1`
  font-size: 4.8rem;
  color: #065f46;
  position: relative;
  .location {
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 1.6rem;
  }
`;

export const TitleContainer = styled.div`
  @media (max-width: 900px) {
    justify-self: center;
  }
`;

export const BtnsContainer = styled.div`
  justify-self: right;

  @media (max-width: 900px) {
    justify-self: center;
  }
`;

export const Btn = styled.button`
  padding: 1.2rem;
  border: none;
  background-color: white;
  color: #065f46;
  background-color: #f7f7f7;

  .number {
    font-size: 1.8rem;
    font-weight: bold;
  }

  .text {
    font-size: 1.4rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.7px;
  }

  &:hover {
    color: #10b981;
  }
`;

export const Flag = styled(IoFlagSharp)`
  color: inherit;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const Star = styled(IoStarSharp)`
  color: inherit;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const List = styled(IoListSharp)`
  color: inherit;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const ImgsWrapper = styled.div`
  position: relative;
  animation: movedown 1s;
`;

export const ImgsContainer = styled.div`
  display: flex;
  overflow: hidden;
  gap: 1rem;
  margin-bottom: 5rem;
  position: relative;
`;

export const Img = styled.img`
  height: 40rem;
  width: auto;
  transition: all 0.5s;
  cursor: pointer;
`;

export const ModalImg = styled.img`
  height: 60rem;
  width: auto;
  transition: all 0.5s;
  cursor: auto;

  @media (max-width: 800px) {
    height: 50rem;
  }

  @media (max-width: 550px) {
    height: 35rem;
  }

  @media (max-width: 400px) {
    height: 25rem;
  }
`;

export const CloseModalIcon = styled(IoCloseSharp)`
  position: absolute;
  right: -6rem;
  top: -6rem;
  font-size: 5rem;
  color: #065f46;
  cursor: auto;
`;

export const LeftBtn = styled(IoArrowBackSharp)`
  position: absolute;
  left: -7rem;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  font-size: 5rem;
  transform: translate(0, -50%);
  color: #065f46;
  &:hover {
    color: #10b981;
  }


  @media (max-width: 768px) {
    font-size: 3rem;
    left: -4rem;
  }
`;

export const RightBtn = styled(IoArrowForwardSharp)`
  position: absolute;
  right: -7rem;
  top: 50%;
  z-index: 10;
  font-size: 5rem;
  transform: translate(0, -50%);
  cursor: pointer;
  color: #065f46;

  &:hover {
    color: #10b981;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    right: -4rem;
  }
`;

export const BodyContainer = styled.div`
  background-color: #ecfdf5;
`;

export const SmallContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 3rem;
  padding: 6.4rem;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    justify-items: center;
    width: 100%;
  }
`;

export const Description = styled.p`
  font-size: 2rem;
  font-family: "IBM Plex Serif", serif;
  line-height: 1.5;
  color: #111827;
  margin-bottom: 4.8rem;
  /* word-break: break-all; */
  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }
`;

export const AddReview = styled.div`
  width: 60%;
  grid-column: 1 / -1;
  margin-bottom: 4.8rem;
  margin-top: 2.5rem;
  @media (max-width: 900px) {
    width: 100%;
    align-self: center;
    text-align: center;
  }
`;

export const TextArea = styled.textarea`
  background-color: #f9fafb;
  width: 100%;
  display: block;
  margin-bottom: 1.2rem;
  border: none;
  padding: 1.2rem;
  outline: none;
  border: ${({ error }) => (error ? "1px solid red" : "none")};
  &:focus {
    box-shadow: 0 0 0 1px #065f46;
  }
`;

export const ReviewButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  border: none;
  background-color: #065f46;
  color: #fff;
  transition: all 0.3s;
  border-radius: 10rem;
  text-transform: uppercase;
  &:hover {
    background-color: #064e3b;
  }
`;
export const Stars = styled.div`
  margin: 1.2rem 0;
`;

export const Face = styled(IoPersonCircleSharp)`
  color: #065f46;
  font-size: 5rem;
`;

export const Author = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  .name {
    font-weight: bold;
    margin: 0;
    font-size: 1.7rem;
  }

  @media (max-width: 900px) {
    text-align: center;
  }
`;

export const DeleteButton = styled.button`
  margin-left: 1rem;
  border: none;
  background-color: #065f46;
  padding: 0.8rem 1.6rem;
  color: white;
  border-radius: 10rem;
`;

export const CenterText = styled.div`
  text-align: left;
  @media (max-width: 900px) {
    text-align: center;
  }
`;

export const Reviews = styled.div`
  .title {
    font-size: 4rem;
    margin-bottom: 2.5rem;
  }
`;
export const Review = styled.div`
  margin-bottom: 4.8rem;
  .content {
    font-size: 2rem;
    line-height: 1.3;
    font-family: Arial, Helvetica, sans-serif;
    /* letter-spacing: 0.01px; */
  }
`;

export const MapContainer = styled.div`
  border: 2px solid #065f46;
  padding: 1rem;
  align-self: start;
  border-radius: 10px;
  margin-bottom: 3rem;
`;

export const Delete = styled.button`
  background-color: #f87171;
  border: none;
  padding: 0.8rem 1.6rem;
  color: black;
  border-radius: 10rem;
`;

export const Edit = styled.button`
  background-color: #fde68a;
  border: none;
  padding: 0.8rem 1.6rem;
  margin-right: 2rem;
  border-radius: 10rem;
  .link {
    text-decoration: none;
    color: black;
  }
`;

export const Label = styled.p`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-weight: bold;
`;

export const LoginButton = styled.button`
  padding: 1.2rem 3rem;
  border: none;
  background-color: #065f46;
  transition: all 0.3s;
  margin-right: 3rem;
  margin-left: 1rem;
  border-radius: 10rem;
  text-transform: uppercase;
  .link {
    color: #fff;
    text-decoration: none;
  }

  &:hover {
    background-color: #064e3b;
  }
`;

export const RegisterButton = styled.button`
  padding: 1.2rem 3rem;
  border: none;
  background-color: #d1fae5;
  transition: all 0.3s;
  border-radius: 10rem;
  text-transform: uppercase;

  .link {
    color: #064e3b;
    text-decoration: none;
  }

  &:hover {
    background-color: #a7f3d0;
  }
`;

export const FlashMessage = styled.p`
  position: absolute;
  font-size: 1.8rem;
  color: #064e3b;
  top: -25px;
  left: 50%;
  transform: translateX(50%);
  background-color: #d1fae5;
  padding: 1rem;
  border-radius: 1rem;
  white-space: nowrap;
`;

export const Rating = styled.div`
  margin: 0;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const RatingsNumber = styled.p`
  color: #064e3b;
  margin-bottom: 0;
  padding: 0;

  .text {
    font-size: 1.8rem;
  }
`;
