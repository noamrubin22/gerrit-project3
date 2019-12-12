import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile/Profile";
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
        setUserChatroom(result.userChatroom);
        console.log("setting location: ", result);
        setUserLocation(result.userLocation);
        console.log("rerender after setting location");
        navigator.geolocation.watchPosition(() =>
          setLocation()
            .then(result => {
              setUserChatroom(result.userChatroom);
              setUserLocation(result.userLocation);
            })
            .catch(err => console.log(err))
        );
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <Switch>
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
        <>
          <Navbar
            {...props}
            user={user}
            setUser={setUser}
            userChatroom={userChatroom}
            clearUser={setUser}
          />
          <Route exact path="/map" component={Map} />
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
                return <Profile {...props} user={user} setUser={setUser} />;
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
        </>
      </Switch>
    </div>
  );
};

export default App;
