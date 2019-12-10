import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Chat from "./components/Chat/Chat"
import Landingpage from "./components/Landingpage/Landingpage"
import { setLocation } from "./services/location";

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
      .catch(err => console.log(err))

    navigator.geolocation.watchPosition(() => setLocation()
    .then(result => {
      setUserChatroom(result.userChatroom);
      setUserLocation(result.userLocation);
    })
    .catch(err => console.log(err)))
  }, [])

  return (
    <div className="App">
      {/* <Navbar user={user} clearUser={setUser} /> */}
      <Route exact path="/" render={props => <Landingpage {...props} setUser={setUser} setUserChatroom={setUserChatroom} userChatroom={userChatroom}/>}
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
        render={props => <Login {...props} setUser={setUser} setUserChatroom={setUserChatroom} userChatroom={userChatroom}/>}
      /> */}
      <Route exact path="/chat/:room" render={props => {
        // only users can get into chat
        if (user) {
  return <Chat {...props} user={user} userChatroom={userChatroom} setUserChatroom={setUserChatroom}/>;
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

/* 
class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} clearUser={this.setUser} />
        <Route
          exact
          path="/projects"
          // component={Projects}
          render={props => {
            if (this.state.user) {
              return <Projects {...props} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          exact
          path="/projects/:id"
          render={props => <ProjectDetail user={this.state.user} {...props} />}
        />

/*         <Route exact path="/tasks/:id" component={TaskDetail} />
        <Route
          exact
          path="/signup"
          // component={Signup}
          render={props => <Signup {...props} setUser={this.setUser} />}
        />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} setUser={this.setUser} />}
        />
      </div>
    );
  }
}

export default App; */
