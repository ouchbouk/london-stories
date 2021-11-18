import React from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { googleAuth } from "../../actions";

function Login({ googleAuth, text }) {
  const onSuccess = (res) => {
    googleAuth(res.tokenId);
  };

  const onFailure = (res) => {
    console.log("LOGGIN FAILED");
  };

  return (
    <div>
      <GoogleLogin
        render={(renderProps) => (
          <span onClick={renderProps.onClick}>{text}</span>
        )}
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
      />
    </div>
  );
}

export default connect(null, { googleAuth })(Login);
