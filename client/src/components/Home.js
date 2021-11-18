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
        <HeadingPrimary>Mysterious London</HeadingPrimary>
        <HeadingSecondary>
          discover places you never thought existed
          <div style={{textAlign:'center',marginTop:'10px'}}>in london</div>
        </HeadingSecondary>
        <Button as={Link} to="/attractions">
          discover Now
        </Button>
      </Hero>
    </Container>
  );
};

export default Home;
