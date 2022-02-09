import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "../history";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Header from "./Header";
import Create from "./attractions/Create";
import AttractionsList from "./attractions/AttractionsList";
import AttractionDetails from "./attractions/AttractionDetails";
import myAttractions from "./attractions/myAttractions";
import Search from "./attractions/Search";
import Edit from "./attractions/Edit";
import { connect } from "react-redux";
import { isLoggedIn } from "../actions";
import AttractionsMap from "./attractions/AttractionsMap";
import GlobalStyles from "../styles/GlobalStyles";
import PageNotFound from "./PageNotFound";
import Home from "./Home";
import CreateStory from "./stories/CreateStroy";
import StoriesList from "./stories/StoriesList";
import Story from "./stories/Story";
import UserStories from "./stories/UserStories";
import StoryEdit from "./stories/StoryEdit";
import StoriesTag from "./stories/StoriesTag";

class App extends React.Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }

  render() {
    return (
      <Router history={history}>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/attractions" component={AttractionsList} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/attractions/search" component={Search} />
          <Route exact path="/attractions/map" component={AttractionsMap} />
          <Route exact path="/attractions/:id/edit" component={Edit} />
          <Route exact path="/attractions/:id" component={AttractionDetails} />
          <Route exact path="/myattractions" component={myAttractions} />
          <Route exact path="/myattractions" component={myAttractions} />
          <Route exact path="/stories/new" component={CreateStory} />
          <Route exact path="/stories/tag/:tag" component={StoriesTag} />
          <Route exact path="/stories/:id" component={Story} />
          <Route exact path="/user/:id/stories" component={UserStories} />
          <Route exact path="/user/stories/:id/edit" component={StoryEdit} />
          <Route exact path="/stories" component={StoriesList} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, { isLoggedIn })(App);
