import React, { useState } from "react";
import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./Backdrop/Backdrop";

const Navbar = props => {
  // console.log("NAVBAR PROPS", props);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = event => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = event => {
    setSideDrawerOpen(false);
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }

  return (
    <div style={{ height: "100%" }}>
      <Toolbar drawerClickHandler={drawerToggleClickHandler} />
      <SideDrawer
        show={sideDrawerOpen}
        user={props.user}
        clearUser={props.clearUser}
        userChatroom={props.userChatroom}
      />
      {backdrop}
      <main style={{ marginTop: "64px" }}></main>
    </div>
  );
};

export default Navbar;
