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
  state = {
    searchBy: "attraction",
    query: "",
  };

  renderStories = () => {
    if (this.props.stories && this.props.stories.length === 0)
      return (
        <ul style={{ listStyle: "none" }}>
          {this.props.stories.map(({ title, _id }) => (
            <li>
              <Link to={`/stories/${_id}`}> {title}</Link>
            </li>
          ))}
        </ul>
      );
  };

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

  render() {
    return (
      <MainContainer>
        <CenterText>
          <Title>Search</Title>
        </CenterText>
        <BarContainer>
          <div style={{ display: "flex", marginBottom: "12px", gap: "20px" }}>
            <div>
              <label style={{ marginRight: "8px" }}>Attraction</label>
              <input
                type="radio"
                name="search-by"
                onChange={() => {
                  this.setState({ searchBy: "attraction" });
                }}
                checked={this.state.searchBy === "attraction" ? true : false}
              />
            </div>
            <div>
              <label style={{ marginRight: "8px" }}>Story</label>
              <input
                type="radio"
                name="search-by"
                onChange={() => {
                  this.setState({ searchBy: "story" });
                }}
                checked={this.state.searchBy === "story" ? true : false}
              />
            </div>
          </div>
          <SearchBar searchBy={this.state.searchBy} />
        </BarContainer>

        <div>
          {this.state.searchBy === "attraction" && this.renderAttractions()}
        </div>
        <div>{this.state.searchBy === "story" && this.renderStories()}</div>
      </MainContainer>
    );
  }
}

export default connect(
  ({ attractionsSearchResults, query, stories }) => {
    return {
      attractions: _.values(attractionsSearchResults),
      query,
      stories: _.values(stories),
    };
  },
  { searchAttractions, searchStories }
)(Search);
