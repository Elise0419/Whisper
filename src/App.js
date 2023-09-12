import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./component/Home";
import Upload from "./component/Upload";
import Post from "./component/Post";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Fashion from "./component/Theme/Fashion";
import Love from "./component/Theme/Love";
import Health from "./component/Theme/Health";
import Food from "./component/Theme/Food";
import Makeup from "./component/Theme/Makeup";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/post" component={Post} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/fashion" component={Fashion} />
          <Route path="/love" component={Love} />
          <Route path="/health" component={Health} />
          <Route path="/food" component={Food} />
          <Route path="/makeup" component={Makeup} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
