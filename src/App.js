import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./component/Home";
import Upload from "./component/Upload";
import Post from "./component/Post";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Forgotpw from "./component/Forgotpw";
import Theme from "./component/Theme";
import Profile from "./component/Profile";
import Manage from "./component/Manage";
import Restpwd from "./component/Restpwd";
import Verify from "./component/Verify";
import Verifyre from "./component/verifyre";
import Secret from "./component/Secret";
import Admin from "./component/Admin";
import ConmentAdmin from "./component/ConmentAdmin";
import Secret2 from "./component/Secret2";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/secret" component={Secret} exact />
          <Route path="/secret2" component={Secret2} exact />

          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/forgotpw" component={Forgotpw} exact />
          <Route path="/restpwd" component={Restpwd} exact />
          <Route path="/verify" component={Verify} exact />
          <Route path="/verifyre" component={Verifyre} exact />
          <Route path="/admin/article" component={Admin} exact />
          <Route
            path="/admin/post_:postId(\d+)/comments"
            component={ConmentAdmin}
            exact
          />
          <Route path="/upload/:type" component={Upload} exact />

          <Route path="/profile" component={Profile} exact />
          <Route path="/manage" component={Manage} exact />

          <Route path="/post" component={Post} exact />
          <Route path="/post/:postId/:type" component={Post} exact />
          <Route path="/" component={Home} exact />
          <Route path="/:type" component={Theme} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
