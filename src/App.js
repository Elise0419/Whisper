import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./component/Home";
import Upload from "./component/Upload";
import Post from "./component/Post";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Forgotpw from "./component/Forgotpw";
// import Fashion from "./component/Theme/Fashion";
// import Love from "./component/Theme/Love";
// import Life from "./component/Theme/Life";
// import Food from "./component/Theme/Food";
import Mkup from "./component/Theme/Mkup";
import Profile from "./component/Profile";
import Manage from "./component/Manage";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:type" component={Mkup} exact />
          <Route path="/upload" component={Upload} exact />
          <Route path="/post" component={Post} exact />
          <Route path="/post/:postId" component={Post} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/forgotpw" component={Forgotpw} exact />
          {/* <Route path="/fashion" component={Fashion} exact />
          <Route path="/love" component={Love} exact />
          <Route path="/life" component={Life} exact />
          <Route path="/food" component={Food} exact />
          <Route path="/mkup" component={Mkup} exact /> */}
          <Route path="/profile" component={Profile} exact />
          <Route path="/manage" component={Manage} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
