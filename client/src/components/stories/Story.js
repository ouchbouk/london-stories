import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/story.module.css";
import {
  getStory,
  likeStory,
  dislikeStory,
  addComment,
  deteteStoryComment,
} from "../../actions";
import {
  Author,
  CenterText,
  DeleteButton,
  Face,
  Review,
  Reviews,
} from "../styledComponents/attractionDetails";

class Story extends React.Component {
  state = {
    comment: "",
  };
  componentDidMount() {
    this.props.getStory(this.props.match.params.id);
  }
  renderEditButton(authorId, _id) {
    if (this.props.user.id !== authorId) return <div />;
    return <Link to={`/user/stories/${_id}/edit`}>Edit</Link>;
  }

  renderComments = () => {
    if (this.props.story.comments.length < 1) return "";
    return (
      <div style={{ width: "500px", margin: "auto" }}>
        <Reviews>
          <h3 style={{ textAlign: "center" }} className="title">
            Comments
          </h3>
          <ul>
            {this.props.story.comments.map(({ content, _id, author }) => {
              return (
                <Review key={_id}>
                  <Author>
                    <Face />
                    <p className="name">{author.username}</p>
                    {this.props.user.loggedIn &&
                      this.props.user.id === author._id && (
                        <DeleteButton
                          onClick={() => {
                            this.props.deteteStoryComment({
                              sotryId: this.props.story._id,
                              commentId: _id,
                            });
                          }}
                        >
                          delete
                        </DeleteButton>
                      )}
                  </Author>
                  <p className="content">{content}</p>
                </Review>
              );
            })}
          </ul>
        </Reviews>
      </div>
    );
  };

  render() {
    let story = this.props.story;
    if (!story) return "LOADING...";
    let {
      title,
      body,
      likes,
      dislikes,
      locationId: location,
      _id,
      createdAt,
      tags,
      author,
    } = story;

    return (
      <div style={{ width: "80%", margin: "0 auto" }}>
        {this.renderEditButton(author._id, _id)}
        <h1 className={styles["title"]}>{title}</h1>
        <p style={{ textAlign: "center", fontSize: "1.1rem" }}>
          By{" "}
          <Link className={styles["author"]} to={`/user/${author._id}/stories`}>
            {author.username}
          </Link>
        </p>
        <p className={styles["publication-date"]}>
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p style={{ textAlign: "center" }}>
          <Link
            className={styles["location"]}
            to={`/attractions/${location._id}`}
          >
            {location.name}
          </Link>
        </p>
        <ul className={styles[`tags-list`]}>
          {tags.map((tag, i) => (
            <li key={i}>
              <Link className={styles[`tag`]} to={`/stories/tag/${tag}`}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles["story-body"]}>{body}</p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            width: "300px",
            margin: "auto",
            justifyContent: "center",
          }}
        >
          <button
            className={styles["button"]}
            onClick={() => {
              this.props.likeStory(_id);
            }}
          >
            {likes.length} Like
          </button>
          <button
            className={styles["button"]}
            onClick={() => {
              this.props.dislikeStory(_id);
            }}
          >
            {dislikes.length} Dislike
          </button>
        </div>
        <div>
          {/* <label style={{ display: "block" }}>Comment:</label> */}
          <div style={{ width: "30rem", margin: "auto" }}>
            <textarea
              className={styles[`comment-area`]}
              value={this.state.comment}
              onChange={(e) => {
                this.setState({ comment: e.target.value });
              }}
            />
            <button
              className={styles["sbmt-button"]}
              onClick={() => {
                this.props.addComment(_id, this.state.comment);
                this.setState({ comment: "" });
              }}
              style={{ display: "block" }}
            >
              Submit
            </button>
          </div>
        </div>
        {this.renderComments()}
        {/* <ul>
          {comments.map(({ content, author, _id }, i) => (
            <li key={i}>
              {content}
              {this.props.user.loggedIn && this.props.user.id === author && (
                <button
                  onClick={() => {
                    this.props.deteteStoryComment({
                      sotryId: this.props.story._id,
                      commentId: _id,
                    });
                  }}
                >
                  delete
                </button>
              )}
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}

export default connect(
  ({ stories, user }, ownProps) => {
    return { story: stories[ownProps.match.params.id], user };
  },
  { getStory, likeStory, dislikeStory, addComment, deteteStoryComment }
)(Story);
