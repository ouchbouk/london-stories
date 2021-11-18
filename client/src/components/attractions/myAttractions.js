import React from "react";
import { connect } from "react-redux";
import { getUserAttractions } from "../../actions";
import { Link } from "react-router-dom";
import { MainContainer } from "../styledComponents/general";
import history from "../../history";

import {
  Container as ListWrapper,
  AttractionCard,
  AttractionImg,
  CardContent,
  Title,
  ContinueBtn,
} from "../styledComponents/attractionsList";
import { CenterText, Rating } from "../styledComponents/attractionDetails";
import StarRatings from "react-star-ratings";

class MyAttractions extends React.Component {
  componentDidMount() {
    if (this.props.user && this.props.user.loggedIn)
      this.props.getUserAttractions();
  }

  renderAttractions = (attractions) => {
    if (!attractions || attractions.length === 0) {
      return <p style={{ fontSize: "25px" }}>Nothing yet</p>;
    }
    return (
      <ListWrapper>
        {attractions.map(
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
      </ListWrapper>
    );
  };

  render() {
    if (!this.props.user.loggedIn) {
      history.push("/login");
    }

    return (
      <MainContainer>
        <Title>Places Where You Want To Go</Title>
        {this.renderAttractions(this.props.user.wantToVisit)}
        <Title>Places Where You've been</Title>
        {this.renderAttractions(this.props.user.beenThere)}
        <Title>Your List </Title>
        {this.renderAttractions(this.props.user.list)}
      </MainContainer>
    );
  }
}

export default connect(
  ({ user }) => {
    return { user };
  },
  { getUserAttractions }
)(MyAttractions);
