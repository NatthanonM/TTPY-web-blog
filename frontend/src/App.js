import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import history from "./History";
import API from "./utils/api";

function App() {
  const [islogin, setIsLogin] = useState(true);
  const [userProfile, setUserProfile] = useState({
    username: "Loading...",
    role: "Loading...",
  });

  const getUser = async () => {
    const res = await API.getUser();
    switch (res.statusCode) {
      case 200:
        setUserProfile(res.data);
        break;
      case 500:
        alert(res.message);
        break;
      default:
        alert("Something went wrong");
        break;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route
            path="/login"
            exact
            render={(props) =>
              true ? <Login {...props} /> : <Redirect to="/" />
            }
          />
          <Route
            path="/"
            exact
            render={(props) =>
              true ? (
                <Home {...props} userProfile={userProfile} />
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
