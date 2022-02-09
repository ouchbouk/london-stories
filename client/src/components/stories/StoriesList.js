import React from "react";
import { connect } from "react-redux";
import { getAllStories } from "../../actions";
import _ from "lodash";
import styles from "../../styles/storiesList.module.css";
import { Link } from "react-router-dom";

class StoriesList extends React.Component {
  state = {
    sortBy: "likes",
    stories: null,
  };
  componentDidMount() {
    this.props.getAllStories();
  }

  static getDerivedStateFromProps(props, prevState) {
    if (props.stories.length > 0 && prevState.stories === null) {
      return { stories: props.stories };
    }
    return null;
  }

  sort(filter) {
    let stories = this.props.stories;

    if (filter === "a-to-z") {
      stories.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      this.setState({ stories });
    }
    if (filter === "z-to-a") {
      stories.sort(function (a, b) {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
      this.setState({ stories });
    }

    if (filter === "likes") {
      stories.sort(function (a, b) {
        if (a.likes.length > b.likes.length) {
          return -1;
        }
        if (a.likes.length < b.likes.length) {
          return 1;
        }
        return 0;
      });
      this.setState({ stories });
    }

    if (filter === "oldest") {
      stories.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      this.setState({ stories });
    }

    if (filter === "newest") {
      stories.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      this.setState({ stories });
    }
  }

  renderStories = () => {
    if (!this.state.stories) return "Loading...";
    let stories = this.state.stories;
    if (stories.length === 0) return <div>No Stories</div>;
    return (
      <div>
        <div>
          <select
            onChange={(e) => {
              this.sort(e.target.value);
            }}
          >
            <option value="" disabled selected hidden>
              Sory By
            </option>
            <option value="likes">Likes</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="a-to-z">A to Z</option>
            <option value="z-to-a">Z to A</option>
          </select>
        </div>
        <div className={styles["stories-grid"]}>
          {stories.map(({ title, _id }) => {
            return (
              <Link to={`/stories/${_id}`} key={_id}>
                {title}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderStories()}</div>;
  }
}

export default connect(
  ({ stories }) => {
    return { stories: _.values(stories) };
  },
  { getAllStories }
)(StoriesList);
