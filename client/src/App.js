import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
/* import Navbar from "./components/Navbar"; */

const App = props => {
  const [user, setUser] = useState(props.user);
  return (
    <div className="App">
      <Login setUser={setUser} />
      <Signup setUser={setUser} />
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
