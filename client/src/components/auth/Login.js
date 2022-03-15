import React from "react";
import { login } from "../../actions";
import { connect } from "react-redux";
import history from "../../history";
import {
  validatePassword,
  validateUsername,
} from "../../validation/validateLogin";

import {
  Container,
  Title,
  Input,
  Label,
  Button,
  CenterText,
  GoogleButton,
  Error,
  FlashError,
} from "../styledComponents/authPage";
import { LoadingRing, MainContainer } from "../styledComponents/general";
import LoginGoogle from "./LoginGoogle";
import { IoLogoGoogle } from "react-icons/io5";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    loading: false,
  };

  usernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  passwordChange = (e) => {
    this.setState({ password: e.target.value });
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

    if (!usernameError && !passwordError) {
      this.props.login(this.state);
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
            Login
            {this.props.user.error && (
              <FlashError>{this.props.user.error}</FlashError>
            )}
          </Title>
        </CenterText>
        <Container>
          <form onSubmit={this.handleSubmit}>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                error={this.state.usernameError}
                value={this.state.username}
                onChange={this.usernameChange}
                name="username"
                type="text"
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
                error={this.state.passwordError}
                value={this.state.password}
                onChange={this.passwordChange}
                name="password"
                type="password"
                onBlur={(e) => {
                  if (
                    validatePassword.validate({ password: e.target.value })
                      .error
                  ) {
                    console.log();
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
              {this.state.loading && <LoadingRing />}LOGIN
            </Button>
            <CenterText>Or</CenterText>
            <LoginGoogle
              text={
                <GoogleButton>
                  LOGIN WITH <IoLogoGoogle style={{ fontSize: "30px" }} />
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
  { login }
)(Login);
