import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./component/Home";
import Upload from "./component/Upload";
import Post from "./component/Post";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Love from "./component/Theme/Love";
import Food from "./component/Theme/Food";
import Fashion from "./component/Theme/Fashion";
import Makeup from "./component/Theme/Makeup";
import Health from "./component/Theme/Health";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/upload" component={Upload} exact />
          <Route path="/post" component={Post} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/love" component={Love} exact />
          <Route path="/food" component={Food} exact />
          <Route path="/fashion" component={Fashion} exact />
          <Route path="/makeup" component={Makeup} exact />
          <Route path="/health" component={Health} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
