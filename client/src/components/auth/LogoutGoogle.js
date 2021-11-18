import React from "react";
import { GoogleLogout } from "react-google-login";
import { connect } from "react-redux";
import { logout } from "../../actions";

function Logout({ logout }) {
  const onSuccess = () => {
    logout();
  };

  return (
      <GoogleLogout
        render={(renderProps) => (
          <span onClick={renderProps.onClick}>
             Logout
          </span>
        )}
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
  );
}

export default connect(null, { logout })(Logout);
