import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Map from "./components/Map";
import Chat from "./components/Chat"

const App = props => {
  const [user, setUser] = useState(props.user);

  return (
    <div className="App">
      <Navbar user={user} clearUser={setUser} />
      <Route
        exact
        path="/signup"
        render={props => <Signup {...props} setUser={setUser} />}
      />
      <Route
        exact
        path="/login"
        render={props => <Login {...props} setUser={setUser} />}
      />
      <Route exact path="/map">
        <Map />
      </Route>
      <Navbar user={user} clearUser={setUser} />
      <Route exact path="/chat" render={props => {
        // only users can get into chat
        if (user) {
          return <Chat {...props} user={user} />;
        } else {
          return <Redirect to="/" />
        }
      }} />
      <Route exact path="/profile" render={props => {     
      // only users can get into chat
        if (user) {
          return <Profile {...props} user={user}/>;
        } else {
          return <Redirect to="/" />
        }
      }} />
    </div>
  );
};

export default App;
