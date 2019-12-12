import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";
import { Navbar as Nav } from "react-bootstrap";

import "./SideDrawer.css";
import "../../index.css";

const sideDrawer = props => {
  const handleLogout = () => {
    logout();
    // console.log("propsSIDEDRAWER", props);
    props.clearUser(null);
  };

  let drawerClasses = "side-drawer";

  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  // console.log("PROPS DRAWER", props);
  // console.log("USER PROOOOOPS.", props.user._id);
  return (
    <nav className={drawerClasses}>
      {props.user ? (
        <>
          <div className="go-back-x">X</div>
          <div className="loggedin-info">
            <Link to={`/chat/${props.userChatroom}`}>
              <h1>Live chat </h1>
            </Link>
            <Link to={`/profile/${props.user._id}`}>
              <h1>Your Profile </h1>
            </Link>
            <Link to="/map">
              <h1>Map of all chats </h1>
            </Link>
          </div>
          <div className="loggedout-info">
            <Link to="/" onClick={handleLogout}>
              <h1>
                <i className="arrow right">{"  "} </i> Logout{" "}
              </h1>
            </Link>
          </div>
        </>
      ) : (
        <React.Fragment>
          <Link to="/">Register</Link>
        </React.Fragment>
      )}
    </nav>
  );
};

export default sideDrawer;
