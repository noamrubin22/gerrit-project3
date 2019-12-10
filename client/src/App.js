import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Chat from "./components/Chat/Chat";
import Landingpage from "./components/Landingpage/Landingpage";
import { setLocation } from "./services/location";
import Map from "./components/Map";

const App = props => {
  const [user, setUser] = useState(props.user);
  const [userChatroom, setUserChatroom] = useState("");
  const [userLocation, setUserLocation] = useState([]);

  useEffect(() => {
    setLocation()
      .then(result => {
        // setUserChatroom(result.userChatroom);
        setUserLocation(result.userLocation);
      })
      .catch(err => console.log(err));

    navigator.geolocation.watchPosition(() =>
      setLocation()
        .then(result => {
          setUserChatroom(result.userChatroom);
          setUserLocation(result.userLocation);
        })
        .catch(err => console.log(err))
    );
  }, []);

  return (
    <div className="App">
      {/* <Navbar user={user} clearUser={setUser} /> */}
      <Route
        exact
        path="/"
        render={props => (
          <Landingpage
            {...props}
            setUser={setUser}
            setUserChatroom={setUserChatroom}
            userChatroom={userChatroom}
          />
        )}
      />
      {/* <Route
        exact
        path="/signup"
        // component={Signup}
        render={props => <Signup {...props} setUser={setUser} setUserChatroom={setUserChatroom} userChatroom={userChatroom}/>}
      />
      <Route
        exact
        path="/login"
        render={props => <Login {...props} setUser={setUser} />}
      />
      */}

      <Route exact path="/map">
        <Map />
      </Route>
      <Navbar user={user} clearUser={setUser} />
      <Route
        exact
        path="/chat"
        render={props => {
          // only users can get into chat
          if (user) {
            return <Chat {...props} user={user} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
      <Route
        exact
        path="/profile/:id"
        render={props => {
          // only users can get into chat
          if (user) {
            return <Profile {...props} user={user} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />

      <Route
        exact
        path="/chat/:room"
        render={props => {
          // only users can get into chat
          if (user) {
            return (
              <Chat
                {...props}
                user={user}
                userChatroom={userChatroom}
                setUserChatroom={setUserChatroom}
              />
            );
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
    </div>
  );
};

export default App;
