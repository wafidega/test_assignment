import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// Page
import Login from "./pages/Login";
import Main from "./pages/Admin/Main";
import PostBlog from "./pages/Admin/PostBlog";
import PublicRoute from "./helpers/routes/PublicRoute";
import Home from "./pages/Home";
// Redux
import { Provider } from "react-redux";
import store from "./stores/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <PublicRoute path="/admin/main" exact component={Main} />
            <PublicRoute path="/admin/PostBlog" exact component={PostBlog} />
            <PublicRoute path="/login" exact component={Login} />
            <PublicRoute path="/" exact component={Home} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
