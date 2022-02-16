import React from "react";
import { connect } from "react-redux";
import Map from "../Map";
import StarRatings from "react-star-ratings";
import Modal from "react-modal";
import { Title as AttractionNotFound } from "../styledComponents/pageNotFound";

import {
  getAttraction,
  addAttractionReview,
  deleteAttrationReview,
  addToWantToVisit,
  addToBeenThere,
  addToList,
  deleteAttraction,
  getUserAttractions,
  removeFromList,
  getStoriesByLocation,
} from "../../actions";
import { Link } from "react-router-dom";
import {
  AddReview,
  Author,
  BodyContainer,
  Btn,
  BtnsContainer,
  Delete,
  DeleteButton,
  Description,
  Edit,
  Face,
  Flag,
  FlashMessage,
  Header,
  Img,
  ImgsContainer,
  ImgsWrapper,
  Label,
  LeftBtn,
  List,
  LoginButton,
  MapContainer,
  Rating,
  RatingsNumber,
  RegisterButton,
  Review,
  ReviewButton,
  Reviews,
  CenterText,
  RightBtn,
  SmallContainer,
  Star,
  Stars,
  TextArea,
  Title,
  TitleContainer,
  CloseModalIcon,
  ModalImg,
} from "../styledComponents/attractionDetails";
import validateReview from "../../validation/validateReview";
import { MainContainer } from "../styledComponents/general";
import history from "../../history";
import { Error } from "../styledComponents/authPage";
import _ from "lodash";

Modal.setAppElement("#root");

class AttractionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      stars: 0,
      reviewError: "",
      scroll: false,
      modalIsOpen: false,
      currentImage: 0,
      loadedImages: 0,
      widths: [],
    };

    this.imgsContainer = React.createRef();
  }

  componentDidMount() {
    this.props.getAttraction(this.props.match.params.id);
    this.props.getStoriesByLocation(this.props);
    if (this.props.user.loggedIn) this.props.getUserAttractions();
    window.scrollTo(0, 0);
  }

  renderScrollButtons = () => {
    if (this.props.attraction) {
      let imagesLength = this.props.attraction.images.length;
      let container = this.imgsContainer.current;
      if (
        this.state.loadedImages === imagesLength &&
        container.scrollWidth > container.clientWidth
      ) {
        return true;
      }
    }
    return false;
  };

  renderReviews = () => {
    if (this.props.attraction.reviews.length < 1) return "";
    return (
      <Reviews>
        <CenterText>
          <h3 className="title">Reviews</h3>
        </CenterText>
        <ul>
          {this.props.attraction.reviews.map(
            ({ content, _id, stars, author }) => {
              return (
                <Review key={_id}>
                  <Author>
                    <Face />
                    <p className="name">{author.username}</p>
                    {this.props.user.loggedIn &&
                      this.props.user.id === author._id && (
                        <DeleteButton
                          onClick={() => {
                            this.props.deleteAttrationReview({
                              attractionId: this.props.attraction._id,
                              reviewId: _id,
                            });
                          }}
                        >
                          delete
                        </DeleteButton>
                      )}
                  </Author>
                  <Rating>
                    <StarRatings
                      rating={stars}
                      starDimension="16px"
                      starSpacing="2px"
                      starRatedColor="#065f46"
                    />
                  </Rating>
                  <p className="content">{content}</p>
                </Review>
              );
            }
          )}
        </ul>
      </Reviews>
    );
  };

  changeRating = (stars) => {
    this.setState({ stars });
  };

  renderAddReview = () => {
    if (!this.props.user.loggedIn) {
      return (
        <AddReview>
          <Label>Log in or Signup to leave a review</Label>

          <LoginButton>
            <Link className="link" to="/login">
              Login
            </Link>
          </LoginButton>
          <RegisterButton>
            <Link className="link" to="/register">
              SIGN UP
            </Link>
          </RegisterButton>
        </AddReview>
      );
    }

    let handleSubmitReview = (e) => {
      e.preventDefault();
      let attractionId = this.props.attraction._id;

      let reviewError = validateReview.validate({
        content: this.state.review,
      }).error;

      if (!reviewError) {
        this.props.addAttractionReview({
          attractionId,
          content: this.state.review,
          stars: this.state.stars,
        });
        this.setState({ review: "", stars: 0 });
        this.setState({ reviewError: "" });
      } else {
        this.setState({ reviewError: reviewError.details[0].message });
      }
    };

    return (
      <AddReview>
        <form onSubmit={handleSubmitReview} method="post">
          <div>
            <Label>How was your experience?</Label>
            <Stars>
              <StarRatings
                rating={this.state.stars}
                starRatedColor=" #065f46"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="rating"
                starHoverColor=" #065f46"
                starDimension="32px"
              />
            </Stars>
          </div>
          <TextArea
            className="text-area"
            value={this.state.review}
            error={this.state.reviewError}
            onChange={(e) => {
              this.setState({ review: e.target.value });
            }}
            name="review"
            id="review"
            cols="30"
            rows="10"
          ></TextArea>
          <Error>{this.state.reviewError}</Error>
          <ReviewButton type="submit">Add Review</ReviewButton>
        </form>
      </AddReview>
    );
  };

  renderDeleteButton = () => {
    if (
      !this.props.user ||
      this.props.user.id !== this.props.attraction.addedBy
    )
      return "";
    return (
      <Delete
        variant="danger"
        onClick={() => {
          this.props.deleteAttraction(this.props.attraction._id);
        }}
      >
        Delete
      </Delete>
    );
  };

  renderEditButton = () => {
    if (
      !this.props.user.loggedIn ||
      this.props.user.id !== this.props.attraction.addedBy
    )
      return "";
    return (
      <Edit variant="warning">
        <Link
          className="link"
          to={`/attractions/${this.props.attraction._id}/edit`}
        >
          Edit
        </Link>
      </Edit>
    );
  };

  isOnList = () => {
    if (
      this.props.user.list &&
      this.props.user.list.some(
        (attraction) => attraction._id === this.props.attraction._id
      )
    ) {
      return true;
    }

    return false;
  };

  renderAddToListButton = (_id) => {
    if (!this.props.user.loggedIn) {
      return (
        <Btn
          onClick={() => {
            this.props.addToList(_id);
          }}
        >
          <List />
          <p className="text">Add to List</p>
        </Btn>
      );
    } else {
      if (this.isOnList()) {
        return (
          <Btn
            onClick={() => {
              this.props.removeFromList(_id);
            }}
          >
            <List />
            <p className="text">Remove </p>
          </Btn>
        );
      } else {
        return (
          <Btn
            onClick={() => {
              this.props.addToList(_id);
            }}
          >
            <List />
            <p className="text">Add to List</p>
          </Btn>
        );
      }
    }
  };

  renderButtons = (_id) => {
    let { visited, wantToVisit } = this.props.attraction;
    return (
      <BtnsContainer
        onClick={() => {
          if (!this.props.user.loggedIn) history.push("/login");
        }}
      >
        <Btn
          title={`${
            wantToVisit > 1
              ? `${wantToVisit} people want to visit`
              : `${wantToVisit === 1 ? "1 person wants to visit" : ""}`
          }`}
          onClick={() => {
            this.props.addToWantToVisit(_id);
          }}
        >
          <Star />
          <p className="text">Want to Visit</p>
          <p className="number">{wantToVisit}</p>
        </Btn>
        <Btn
          title={`${
            visited > 1
              ? `${visited} people visited here`
              : `${visited === 1 ? "1 person visited here" : ""}`
          }`}
          onClick={() => {
            this.props.addToBeenThere(_id);
          }}
        >
          <Flag />

          <p className="text">Been Here?</p>
          <p className="number">{visited}</p>
        </Btn>

        {this.renderAddToListButton(_id)}
      </BtnsContainer>
    );
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
    document.body.style.overflow = "hidden";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    document.body.style.overflow = "unset";
  };

  renderImageModal = () => {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: 0,
        overflow: "visible",
      },
      overlay: { zIndex: 1000 },
    };

    return (
      <div>
        <Modal style={customStyles} isOpen={this.state.modalIsOpen}>
          <CloseModalIcon onClick={this.closeModal} />
          <ModalImg src={this.state.currentImage} />
        </Modal>
      </div>
    );
  };

  renderImages = (images) => {
    if (images.length > 0) {
      return images.map(({ url, public_id }) => {
        return (
          <Img
            onClick={() => {
              this.setState({ currentImage: url });
              this.openModal();
            }}
            key={public_id}
            src={url}
            alt={public_id}
            onLoad={() => {
              let loadedImages = this.state.loadedImages;
              this.setState({ loadedImages: loadedImages + 1 });
            }}
          />
        );
      });
    }
    return "";
  };
  sideScroll(element, speed, distance, step) {
    let container = this.imgsContainer.current;

    let images = [...container.querySelectorAll("Img")];
    let widths = [];
    for (let i = 0; i < images.length; i++) {
      widths.push(images[i].clientWidth);
    }
    console.log(widths);

    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  }

  renderAttraction = () => {
    if (this.props.attraction) {
      let {
        name,
        description,
        images,
        location,
        _id,
        geocode,
        averageRating,
        reviews,
      } = this.props.attraction;
      this.props.getStoriesByLocation(_id);
      return (
        <div>
          <MainContainer>
            {this.renderImageModal()}
            <Header>
              <TitleContainer>
                <Title>
                  {name} <p className="location">{location}</p>
                  {this.props.flashMessage && (
                    <FlashMessage>{this.props.flashMessage}</FlashMessage>
                  )}
                </Title>
                <Rating>
                  <StarRatings
                    rating={averageRating}
                    starDimension="1.8rem"
                    starSpacing="2px"
                    starRatedColor="#065f46"
                  />
                  <RatingsNumber>
                    <span className="text">
                      {reviews.length}{" "}
                      {`${
                        reviews.length > 1 || reviews.length === 0
                          ? "ratings"
                          : "rating"
                      }`}
                    </span>
                  </RatingsNumber>
                </Rating>
                {this.renderEditButton(_id)}
                {this.renderDeleteButton()}
              </TitleContainer>

              {this.renderButtons(_id)}
            </Header>

            <ImgsWrapper>
              {this.renderScrollButtons() && (
                <LeftBtn
                  onClick={() => {
                    this.sideScroll(this.imgsContainer.current, 1, 610, -16);
                  }}
                ></LeftBtn>
              )}

              {this.renderScrollButtons() && (
                <RightBtn
                  onClick={() => {
                    this.sideScroll(this.imgsContainer.current, 1, 610, 16);
                  }}
                ></RightBtn>
              )}
              <div style={{ transform: "translate(0, 0)" }}>
                <ImgsContainer ref={this.imgsContainer}>
                  {this.renderImages(images)}
                </ImgsContainer>
              </div>
            </ImgsWrapper>
          </MainContainer>
          <BodyContainer>
            <SmallContainer>
              <Description>{description}</Description>
              <MapContainer>
                <Map geocode={geocode} />
              </MapContainer>
              {this.renderAddReview()}
              {this.renderReviews()}
            </SmallContainer>
          </BodyContainer>
        </div>
      );
    } else {
      return <AttractionNotFound>Attraction not found</AttractionNotFound>;
    }
  };

  renderStories = () => {
    let stories = this.props.stories;

    if (!stories) return <div>Loading</div>;
    if (stories.length === 0) return <div>No Stories</div>;
    return (
      <ul>
        {stories.map(({ title, _id }, i) => {
          return (
            <li key={i}>
              <Link to={`/stories/${_id}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    return (
      <div>
        {this.renderAttraction()}
        {this.renderStories()}
      </div>
    );
  }
}

export default connect(
  ({ attractions, user, flashMessage, stories }, ownProps) => {
    return {
      attraction: attractions[ownProps.match.params.id],
      user,
      flashMessage: flashMessage.data,
      stories: _.values(stories),
    };
  },
  {
    getAttraction,
    addAttractionReview,
    deleteAttrationReview,
    addToWantToVisit,
    addToBeenThere,
    addToList,
    deleteAttraction,
    getUserAttractions,
    removeFromList,
    getStoriesByLocation,
  }
)(AttractionDetails);
