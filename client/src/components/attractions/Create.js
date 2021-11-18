import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import { createAttraction, getAdresses, isLoggedIn } from "../../actions";
import _ from "lodash";
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
import { LoadingRing, MainContainer } from "../styledComponents/general";
import { Error } from "../styledComponents/authPage";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      location: "",
      images: null,
      term: "",
      nameError: "",
      descriptionError: "",
      locationError: "",
      imagesError: "",
      loading: false,
    };
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  onTermChange = (e) => {
    this.setState({ term: e.target.value });

    _.debounce(() => {
      this.props.getAdresses(this.state.term);
      if (this.props.addresses.length === 0) {
        this.setState({ locationError: "It must be a valid UK address" });
      } else {
        this.setState({ locationError: "" });
      }
    }, 500)();
  };

  onLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };

  onImageChange = (e) => {
    this.setState({ images: e.target.files });
    this.setState({
      imagesError: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let nameError = validateName.validate({
      name: this.state.name,
    }).error;

    if (nameError) {
      this.setState({
        nameError: nameError.details[0].message,
      });
    }

    let descriptionError = validateDescription.validate({
      description: this.state.description,
    }).error;

    if (descriptionError) {
      this.setState({
        descriptionError: descriptionError.details[0].message,
      });
    }

    let addresses = this.props.addresses;
    let firstAddress = ''
    if (addresses.length > 0 && this.state.location === "") {
      this.setState({ location: addresses[0].address });
      firstAddress = addresses[0].address;
    }
    let locationError = validateLocation.validate({
      location: this.state.location || firstAddress ,
    }).error;

    if (locationError) {
      this.setState({
        locationError: locationError.details[0].message,
      });
    }

    let imagesError = !this.state.images
      ? "You must upload at least one image"
      : "";

    if (imagesError) {
      this.setState({ imagesError });
    }

    if (!nameError && !locationError && !descriptionError && !imagesError) {
      this.props.createAttraction(this.state);
      this.setState({ location: "" });
      this.setState({ loading: true });
    }
  };

  renderAdressDropdown = () => {
    let addresses = this.props.addresses;
    return (
      <Select onClick={this.onLocationChange}>
        {addresses.map(({ address }, i) => {
          return (
            <option key={i} value={address}>
              {address}
            </option>
          );
        })}
      </Select>
    );
  };

  renderForm() {
    if (!this.props.user.loggedIn) {
      history.push("/login");
    }
    return (
      <div>
        <CenterText>
          <Title>
            Add Attraction
            {this.props.message && (
              <FlashMessage>{this.props.message}</FlashMessage>
            )}
          </Title>
        </CenterText>
        <Container>
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
          >
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
              {this.state.loading && <LoadingRing />}
               Submit Attraction
            </Button>
          </form>
        </Container>
      </div>
    );
  }

  render() {
    return <MainContainer>{this.renderForm()}</MainContainer>;
  }
}

export default connect(
  ({ addresses, user, flashMessage }) => {
    return { addresses, user, message: flashMessage.data };
  },
  { createAttraction, getAdresses, isLoggedIn }
)(Create);
