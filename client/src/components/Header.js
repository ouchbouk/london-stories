import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, googleAuth } from "../actions";
import { IoMenu } from "react-icons/io5";
import { Nav } from "./styledComponents/Header";
import LogoutGoogle from "./auth/LogoutGoogle";
import { useLocation } from "react-router-dom";
// import "../styles/header.css";
// import SearchBar from "./attractions/SearchBar";
// import history from "../history";

const Header = (props) => {
  const [toggle, setToggle] = useState(false);
  let location = useLocation();

  return (
    <Nav
      collapsed={toggle}
      theme={`${location.pathname === "/" ? "white" : "green"}`}
    >
      <Link className="brand" to="/">
        Mysterious London
      </Link>

      <div
        onClick={() => {
          setToggle(!toggle);
        }}
        className={`nav-links`}
      >
        <Link className="link" to="/attractions">
          Attractions
        </Link>
        <Link className="link" to="/attractions/map">
          Map
        </Link>
        <Link className="link" to="/attractions/search">
          Search
        </Link>
        <Link className="link" to="/create">
          Add Attraction
        </Link>

        <Link className="link" to="/myattractions">
          Your Lists
        </Link>
      </div>

      <div className="auth-btns">
        {!props.user.loggedIn && (
          <Link className="link auth-btn" to="/login">
            Login
          </Link>
        )}
        {!props.user.loggedIn && (
          <Link className="link sign-up-btn" to="/register">
            Sign Up
          </Link>
        )}

        {props.user.loggedIn && !props.user.oauth && (
          <button
            className="link auth-btn"
            onClick={() => {
              props.logout();
            }}
          >
            Logout
          </button>
        )}
        {props.user.loggedIn && props.user.oauth && (
          <button to="" className="link auth-btn">
            <LogoutGoogle />
          </button>
        )}
      </div>

      <div
        onClick={() => {
          setToggle(!toggle);
        }}
        className="menu-btn"
      >
        <IoMenu />
      </div>
    </Nav>
  );
};

export default connect(
  ({ user }) => {
    return { user };
  },
  { logout, googleAuth }
)(Header);
