import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { searchAttractions, searchStories } from "../../actions";
import {
  Container as ResultsWrapper,
  AttractionCard,
  AttractionImg,
  CardContent,
  ContinueBtn,
} from "../styledComponents/attractionsList";
import SearchBar from "./SearchBar";

import { MainContainer } from "../styledComponents/general";
import { BarContainer } from "../styledComponents/search";
import { CenterText, Title } from "../styledComponents/authPage";
import { Rating } from "../styledComponents/attractionDetails";
import StarRatings from "react-star-ratings";

class Search extends React.Component {
  renderAttractions = () => {
    if (!this.props.attractions) return "";

    if (this.props.attractions.length === 0) {
      let text =
        this.props.query.length > 0
          ? `No results were found for "${this.props.query}"`
          : "";
      return (
        <ResultsWrapper>
          <div style={{ whiteSpace: "nowrap" }}>{text}</div>
        </ResultsWrapper>
      );
    }

    return (
      <ResultsWrapper>
        {this.props.attractions.map(
          ({ name, description, _id, images, averageRating }) => {
            return (
              <AttractionCard key={_id}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/attractions/${_id}`}
                >
                  <AttractionImg src={images[0].url} alt="pic" />
                  <CardContent>
                    {<p className="name">{name}</p>}
                    <Rating>
                      <StarRatings
                        rating={averageRating}
                        starDimension="1.8rem"
                        starSpacing="1px"
                        starRatedColor="#065f46"
                      />
                    </Rating>
                    <p className="subtitle">
                      {description.substring(0, 101)}...
                    </p>

                    <CenterText>
                      <ContinueBtn>Read More &#8594;</ContinueBtn>
                    </CenterText>
                  </CardContent>
                </Link>
              </AttractionCard>
            );
          }
        )}
      </ResultsWrapper>
    );
  };

  render;

  render() {
    return (
      <MainContainer>
        <CenterText>
          <Title>Search</Title>
        </CenterText>
        <BarContainer>
          <SearchBar />
        </BarContainer>
        <div>{this.renderAttractions()}</div>
      </MainContainer>
    );
  }
}

export default connect(
  ({ attractionsSearchResults, query }) => {
    return { attractions: _.values(attractionsSearchResults), query };
  },
  { searchAttractions, searchStories }
)(Search);
