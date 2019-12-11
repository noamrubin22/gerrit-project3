import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";
import { Navbar as Nav } from "react-bootstrap";

import "./SideDrawer.css";

const sideDrawer = props => {
  const handleLogout = () => {
    logout();
    console.log("props", props);
    props.clearUser(null);
  };

  let drawerClasses = "side-drawer";

  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  console.log("PROPS DRAWER", props);
  return (
    <nav className={drawerClasses}>
      {props.user ? (
        <>
          <Link to={`/profile/${props.user._id}`}>Profile </Link>
          <Link to={`/chat/${props.userChatroom}`}>Chat </Link>
          <Link to="/map">Map </Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
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
