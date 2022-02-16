import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getStory, likeStory, dislikeStory, addComment } from "../../actions";

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
      comments,
      author,
    } = story;

    return (
      <div style={{ width: "80%", margin: "0 auto" }}>
        <h1>{title}</h1>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
        <p>
          By: <Link to={`/user/${author._id}/stories`}>{author.username}</Link>
        </p>
        {this.renderEditButton(author._id, _id)}
        <ul>
          {tags.map((tag, i) => (
            <li key={i}>
              <Link to={`/stories/tag/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
        <p>{body}</p>
        <p>
          Location:{" "}
          <Link to={`/attractions/${location._id}`}>{location.name}</Link>
        </p>
        <h3>likes: {likes.length}</h3>
        <h3>dislikes: {dislikes.length}</h3>
        <button
          onClick={() => {
            this.props.likeStory(_id);
          }}
        >
          Like
        </button>
        <button
          onClick={() => {
            this.props.dislikeStory(_id);
          }}
        >
          Dislike
        </button>
        <div>
          <label style={{ display: "block" }}>Comment:</label>
          <textarea
            value={this.state.comment}
            onChange={(e) => {
              this.setState({ comment: e.target.value });
            }}
          />
          <button
            onClick={() => {
              this.props.addComment(_id, this.state.comment);
              this.setState({ comment: "" });
            }}
            style={{ display: "block" }}
          >
            Submit
          </button>
        </div>
        <ul>
          {comments.map(({ content, author }, i) => (
            <li key={i}>
              {content}
              {this.props.user.loggedIn && this.props.user.id === author && (
                <button
                  // onClick={() => {
                  //   this.props.deleteAttrationReview({
                  //     attractionId: this.props.attraction._id,
                  //     reviewId: _id,
                  //   });
                  // }}
                >
                  delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  ({ stories, user }, ownProps) => {
    return { story: stories[ownProps.match.params.id], user };
  },
  { getStory, likeStory, dislikeStory, addComment }
)(Story);
