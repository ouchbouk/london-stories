import React from "react";
import { connect } from "react-redux";
import { register } from "../../actions";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../../validation/validateUser";
import history from "../../history";
import {
  Container,
  Title,
  Input,
  Label,
  Button,
  CenterText,
  Error,
  FlashError,
  GoogleButton,
} from "../styledComponents/authPage";
import { LoadingRing, MainContainer } from "../styledComponents/general";
import LoginGoogle from "./LoginGoogle";
import { IoLogoGoogle } from "react-icons/io5";

class Register extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    usernameError: "",
    passwordError: "",
    emailError: "",
    loading: false,
  };

  usernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let usernameError = validateUsername.validate({
      username: this.state.username,
    }).error;

    if (usernameError)
      this.setState({ usernameError: usernameError.details[0].message });

    let passwordError = validatePassword.validate({
      password: this.state.password,
    }).error;

    if (passwordError)
      this.setState({ passwordError: passwordError.details[0].message });

    let emailError = validateEmail.validate({
      email: this.state.email,
    }).error;

    if (emailError)
      this.setState({ emailError: emailError.details[0].message });

    if (!usernameError && !passwordError && !emailError) {
      this.props.register(this.state);
      this.setState({ loading: true });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.loading && nextProps.user.error) {
      return { loading: false };
    }
    return null;
  }

  render() {
    if (this.props.user && this.props.user.loggedIn) history.push("/");

    return (
      <MainContainer>
        <CenterText>
          <Title>
            sign up
            {this.props.user.error && (
              <FlashError>{this.props.user.error}</FlashError>
            )}
          </Title>
        </CenterText>

        <Container>
          <form onSubmit={this.handleSubmit}>
            <div>
              <Label htmlFor="username">Email</Label>
              <Input
                value={this.state.email}
                onChange={this.emailChange}
                name="email"
                type="text"
                error={this.state.emailError}
                onBlur={(e) => {
                  if (validateEmail.validate({ email: e.target.value }).error) {
                    this.setState({
                      emailError: validateEmail.validate({
                        email: e.target.value,
                      }).error.details[0].message,
                    });
                  } else {
                    this.setState({ emailError: "" });
                  }
                }}
              />
              <Error>{this.state.emailError}</Error>
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                value={this.state.username}
                onChange={this.usernameChange}
                name="username"
                type="text"
                error={this.state.usernameError}
                onBlur={(e) => {
                  if (
                    validateUsername.validate({ username: e.target.value })
                      .error
                  ) {
                    this.setState({
                      usernameError: validateUsername.validate({
                        username: e.target.value,
                      }).error.details[0].message,
                    });
                  } else {
                    this.setState({ usernameError: "" });
                  }
                }}
              />
              <Error>{this.state.usernameError}</Error>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                value={this.state.password}
                onChange={this.passwordChange}
                name="password"
                type="password"
                error={this.state.passwordError}
                onBlur={(e) => {
                  if (
                    validatePassword.validate({ password: e.target.value })
                      .error
                  ) {
                    this.setState({
                      passwordError: validatePassword.validate({
                        password: e.target.value,
                      }).error.details[0].message,
                    });
                  } else {
                    this.setState({ passwordError: "" });
                  }
                }}
              />
              <Error>{this.state.passwordError}</Error>
            </div>
            <Button type="submit">
              {this.state.loading && <LoadingRing />}SIGN UP
            </Button>

            <CenterText>Or</CenterText>

            <LoginGoogle
              text={
                <GoogleButton>
                  SIGN UP WITH <IoLogoGoogle style={{ fontSize: "30px" }} />
                </GoogleButton>
              }
            />
          </form>
        </Container>
      </MainContainer>
    );
  }
}

export default connect(
  ({ user }) => {
    return { user };
  },
  { register }
)(Register);
