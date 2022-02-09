import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { editAttraction, getAttraction, getAdresses } from "../../actions";
import history from "../../history";
import {
  validateName,
  validateDescription,
  validateLocation,
} from "../../validation/validateAttration";
import {
  Input,
  Label,
  Container,
  Button,
  TextArea,
  Select,
  CenterText,
  Title,
  FlashMessage,
} from "../styledComponents/createAttraction";
import { Error } from "../styledComponents/authPage";
import { LoadingRing } from "../styledComponents/general";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      location: null,
      images: null,
      deleteImages: [],
      term: "",
      nameError: "",
      descriptionError: "",
      locationError: "",
      imagesError: "",
      loading: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.name == null && nextProps.attraction) {
      let { name, description, location } = nextProps.attraction;
      return { name, description, location, term: location };
    }
    return null;
  }

  componentDidMount = () => {
    this.props.getAttraction(this.props.match.params.id);
  };
  onTermChange = (e) => {
    this.setState({ term: e.target.value });
    _.debounce(() => {
      this.props.getAdresses(this.state.term);
      console.log(this.props.addresses);
      if (this.props.addresses.length === 0) {
        this.setState({ locationError: "It must be a valid UK address" });
      } else {
        this.setState({ locationError: "" });
      }
    }, 400)();
  };

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  onLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };

  onImageChange = (e) => {
    this.setState({ images: e.target.files });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { _id } = this.props.attraction;

    let nameError = this.state.nameError;
    let locationError = this.state.locationError;
    let descriptionError = this.state.descriptionError;

    if (!nameError && !descriptionError && !locationError) {
      if (
        this.state.deleteImages.length ===
          this.props.attraction.images.length &&
        !this.state.images
      ) {
        this.setState({ imagesError: "You must upload at least one image" });
      } else {
        this.props.editAttraction({ ...this.state, _id });
        this.setState({ loading: true });
      }
    }
  };

  renderImages = (images) => {
    if (images) {
      return images.map((image) => {
        return (
          <img
            onClick={() => {
              let deleteImages = [...this.state.deleteImages];
              let index = deleteImages.indexOf(image.public_id);
              if (index < 0) {
                deleteImages.push(image.public_id);
                this.setState({ deleteImages });
              } else {
                deleteImages.splice(index, 1);
                this.setState({ deleteImages });
              }
            }}
            key={image.public_id}
            src={image.url}
            alt={image.public_id}
            style={{
              width: "150px",
              height: "auto",
              marginRight: "10px",
              marginBottom: "30px",
              opacity: `${
                this.state.deleteImages.indexOf(image.public_id) < 0
                  ? ""
                  : "0.3"
              }`,
            }}
          />
        );
      });
    }

    return "";
  };

  renderAdressDropdown = () => {
    return (
      <Select onClick={this.onLocationChange}>
        {this.props.addresses.map(({ address }, i) => {
          return (
            <option key={i} value={address}>
              {address}
            </option>
          );
        })}
      </Select>
    );
  };

  render() {
    if (!this.props.user.loggedIn) {
      history.push("/");
    }

    if (!this.props.attraction) return "loading...";

    return (
      <div>
        <CenterText>
          <Title>
            Edit Attraction
            {this.props.message && (
              <FlashMessage>{this.props.message}</FlashMessage>
            )}
          </Title>
        </CenterText>
        <Container style={{ width: "50%", marginBottom: "50px" }}>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div>
              <Label style={{ marginBottom: "20px" }}>
                Select To Delete Images:
              </Label>
              <div>
                {this.props.attraction &&
                  this.renderImages(this.props.attraction.images)}
              </div>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                onChange={this.onNameChange}
                value={this.state.name}
                error={this.state.nameError}
                onBlur={(e) => {
                  let nameError = validateName.validate({
                    name: e.target.value,
                  }).error;
                  if (nameError) {
                    this.setState({
                      nameError: nameError.details[0].message,
                    });
                  } else {
                    this.setState({ nameError: "" });
                  }
                }}
              />
              <Error>{this.state.nameError}</Error>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <TextArea
                name="description"
                onChange={this.onDescriptionChange}
                value={this.state.description}
                error={this.state.descriptionError}
                onBlur={(e) => {
                  let descriptionError = validateDescription.validate({
                    description: e.target.value,
                  }).error;
                  if (descriptionError) {
                    this.setState({
                      descriptionError: descriptionError.details[0].message,
                    });
                  } else {
                    this.setState({ descriptionError: "" });
                  }
                }}
              />
              <Error>{this.state.descriptionError}</Error>
            </div>
            <div>
              <Label htmlFor="location">Address</Label>
              <Input
                type="text"
                name="location"
                onChange={this.onTermChange}
                value={this.state.term}
                error={this.state.locationError}
                onBlur={(e) => {
                  let locationError = validateLocation.validate({
                    location: e.target.value,
                  }).error;
                  if (locationError) {
                    this.setState({
                      locationError: locationError.details[0].message,
                    });
                  } else if (this.props.addresses.length !== 0) {
                    this.setState({ locationError: "" });
                  }
                }}
              />
              <Error>{this.state.locationError}</Error>
            </div>
            {this.props.addresses.length > 0 && this.renderAdressDropdown()}

            <div>
              <Label htmlFor="image">Upload images</Label>
              <Input
                style={{ backgroundColor: "#F9FAFB" }}
                onChange={this.onImageChange}
                type="file"
                name="images"
                multiple
              />
              <Error>{this.state.imagesError}</Error>
            </div>
            <Button type="submit">
              {this.state.loading && <LoadingRing />}Edit Attraction
            </Button>
          </form>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({ attractions, user, addresses, flashMessage }, ownProps) => {
    return {
      attraction: attractions[ownProps.match.params.id],
      user,
      addresses,
      message: flashMessage.data,
    };
  },
  { getAttraction, editAttraction, getAdresses }
)(Edit);
