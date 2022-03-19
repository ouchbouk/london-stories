import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { getUserStories } from "../../actions";
import { Link } from "react-router-dom";
import styles from "../../styles/storiesList.module.css";

const UserStories = (props) => {
  useEffect(() => {
    let id = props.match.params.id;
    props.getUserStories(id);
  }, []);
  let { stories } = props;
  if (!stories) return <div>NO STORIES </div>;

  return (
    <div>
      <h1
        style={{
          margin: "30px",
          color: "#065f46",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Stories By: {stories[0] && stories[0].author.username}
      </h1>
      <div className={styles["stories-grid"]}>
        {stories.map(({ title, _id, body }, i) => {
          return (
            <div
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
                    backgroundColor: " #065f46",
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

// export default connect(
//   ({ userStories }, ownProps) => {
//     return {
//       stories: _.values(userStories).filter(
//         ({ author }) => author === ownProps.match.params.id
//       ),
//     };
//   },
//   { getUserStories }
// )(UserStories);

export default connect(
  ({ userStories }) => {
    return { stories: _.values(userStories) };
  },
  { getUserStories }
)(UserStories);
