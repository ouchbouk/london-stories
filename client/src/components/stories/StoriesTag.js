import React from "react";
import { connect } from "react-redux";
import { getStoriesByTag } from "../../actions";
import _ from "lodash";
import { Link } from "react-router-dom";
import storyStyles from "../../styles/story.module.css";
import styles from "../../styles/storiesList.module.css";
import { Title } from "../styledComponents/createAttraction";

class StoriesTag extends React.Component {
  componentDidMount() {
    this.props.getStoriesByTag(this.props.match.params.tag);
    }

  renderStories() {
    if (!this.props.stories) return <div/>;
    return (
      <div className={styles["stories-grid"]}>
        {this.props.stories.map(({ title, _id, body }, i) => {
          return (
            <div
              className={storyStyles["story_card"]}
              style={{
                padding: "1rem",
                paddingTop:'1.8rem',
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
    );
  }

  render() {
    return (
      <div>
       <Title style={{textAlign:'center'}}> <span style={{textTransform:'uppercase',}}>{this.props.match.params.tag} </span> Stories</Title>
        {this.renderStories()}
      </div>
    );
  }
}

export default connect(
  ({ storiesTag }) => {
    console.log(storiesTag)
    return { stories: _.values(storiesTag) };
  },
  { getStoriesByTag }
)(StoriesTag);
