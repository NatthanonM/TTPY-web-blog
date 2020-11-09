import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import history from "./History";

const isValidToken = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

function Auth({ children }) {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isValidToken() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  if (!children.length) {
    const { component, ...rest } = children.props;
    return <PrivateRoute component={component} {...rest} />;
  }

  return children.map((child) => {
    const { path, component, ...rest } = child.props;
    return <PrivateRoute key={path} component={component} {...rest} />;
  });
}

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route
            path="/login"
            exact
            render={(props) =>
              isValidToken() === false ? (
                <Login {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/"
            exact
            render={(props) =>
              isValidToken() === true ? (
                <Home {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
