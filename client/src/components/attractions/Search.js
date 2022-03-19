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
import styles from "../../styles/storiesList.module.css";

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
      console.log(this.props);
    return (
      <div className={styles["stories-grid"]}>
        {this.props.stories.map(({ title, _id, body }, i) => {
          return (
            <div
              style={{
                padding: "1rem",
                backgroundColor: "white",
                width: "28rem",
                height: "30rem",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 0.2rem 2rem rgba(0, 0, 0, 0.15)",
              }}
              key={i}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/stories/${_id}`}
              >
                <span
                  style={{
                    marginBottom: "2rem",
                    display: "block",
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </span>
                <p
                  style={{
                    fontSize: "1.5rem",
                    textAlign: "justify",
                    width: "20rem",
                    margin: "auto",
                    marginBottom: "3rem",
                  }}
                >
                  {body && body.split(/\s+/).slice(0, 45).join(" ")}...
                </p>
                <button
                  style={{
                    backgroundColor: " #065f46",
                    color: "white",
                    border: "none",
                    padding: "1rem 1.5rem",
                    borderRadius: "12px",
                  }}
                >
                  Continue Reading
                </button>
              </Link>
            </div>
          );
        })}
      </div>
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
          <SearchBar searchBy={this.state.searchBy} />
          <div
            style={{
              display: "flex",
              margin: "12px",
              gap: "20px",
              justifyContent: "center",
            }}
          >
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
  ({ attractionsSearchResults, query, searchStories }) => {
    return {
      attractions: _.values(attractionsSearchResults),
      query,
      stories: _.values(searchStories),
    };
  },
  { searchAttractions, searchStories }
)(Search);
