import React from "react";
import { Link } from "react-router-dom";

import {
  Hero,
  Button,
  HeadingPrimary,
  HeadingSecondary,
  Container,
} from "./styledComponents/home";

const Home = () => {
  return (
    <Container>
      <Hero>
        <HeadingPrimary>London Stories</HeadingPrimary>
        <HeadingSecondary>
          Read Stories Inspired By Real Locations
          {/* <div style={{textAlign:'center',marginTop:'10px'}}>in london</div> */}
        </HeadingSecondary>
        <Button as={Link} to="/attractions">
          Start Reading
        </Button>
      </Hero>
    </Container>
  );
};

export default Home;
