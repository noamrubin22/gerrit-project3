import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Map from "./components/Map";

const App = props => {
  const [user, setUser] = useState(props.user);

  return (
    <div className="App">
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

      <Route exact path="/profile" component={Profile} />
      <Route exact path="/map">
        <Map />
      </Route>
      <Navbar user={user} clearUser={setUser} />
    </div>
  );
};

export default App;
