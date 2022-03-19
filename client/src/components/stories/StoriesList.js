import React from "react";
import { connect } from "react-redux";
import { getAllStories } from "../../actions";
import _ from "lodash";
import styles from "../../styles/storiesList.module.css";
import { Link } from "react-router-dom";
import storyStyles from "../../styles/story.module.css";

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
        <h1 className={styles["page_title"]}>Stories</h1>
        <div style={{ position: "relative", backgroundColor: "red" }}>
          <select
            className={styles["select_sorting"]}
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
          {stories.map(({ title, _id, body }, i) => {
            return (
              <div
                className={storyStyles["story_card"]}
                style={{
                  padding: "2rem",
                  backgroundColor: "white",
                  width: "28rem",
                  height: "30rem",
                  borderRadius: "12px",
                  textAlign: "center",
                  boxShadow: "0 0.2rem 2rem rgba(0, 0, 0, 0.15)",
                }}
                key={i}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/stories/${_id}`}
                >
                  <span
                    style={{
                      marginBottom: "2rem",
                      display: "block",
                      fontWeight: "bold",
                    }}
                  >
                    {title}
                  </span>
                  <p
                    style={{
                      fontSize: "1.5rem",
                      textAlign: "justify",
                      width: "20rem",
                      margin: "auto",
                      marginBottom: "3rem",
                    }}
                  >
                    {body && body.split(/\s+/).slice(0, 45).join(" ")}...
                  </p>
                  <button
                    style={{
                      backgroundColor: "#065f46",
                      color: "white",
                      border: "none",
                      padding: "1rem 1.5rem",
                      borderRadius: "12px",
                    }}
                  >
                    Continue Reading
                  </button>
                </Link>
              </div>
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
