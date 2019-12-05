import React from 'react';
import './App.css';
import routes from './routes'
import { Switch, Route, Redirect } from 'react-router-dom'



function ProtectedRoute(props) {

  const attempt = props.path

  if (props.private && !props.user) {

    return <Redirect to={{ pathname: '/login', attempt }} />
  }
  return <Route key={props.path} path={props.path} exact={props.exact} private={props.private} render={() => <props.component {...props} />} />
}


function App(props) {

  const routing = routes.map(x => {

    return <ProtectedRoute key={x.path} {...x} {...props} />
  })

  return (
    <div className="App">
      <Switch>
        {routing}
      </Switch>
    </div>
  );
}

export default App;