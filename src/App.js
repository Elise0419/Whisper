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
import Secrets from "./component/Secrets";
import ArticleAdmin from "./component/ArticleAdmin";
import CommentAdmin from "./component/CommentAdmin";
import { UserProvider } from "./store/UserContext";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/secret" component={Secret} exact />
          <Route path="/secrets" component={Secrets} exact />

          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/forgotpw" component={Forgotpw} exact />
          <Route path="/restpwd" component={Restpwd} exact />
          <Route path="/verify" component={Verify} exact />
          <Route path="/verifyre" component={Verifyre} exact />
          <Route path="/admin/article" component={CommentAdmin} exact />
          <Route
            path="/admin/post_:postId(\d+)/comments"
            component={CommentAdmin}
            exact
          />
          <Route path="/admin/article" component={ArticleAdmin} exact />
          <Route
            path="/admin/post_:postId(\d+)/comments"
            component={CommentAdmin}
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
