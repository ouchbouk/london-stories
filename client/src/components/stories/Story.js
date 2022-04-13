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
  AddReview,
  Author,
  DeleteButton,
  Face,
  LoginButton,
  RegisterButton,
  Review,
  Reviews,
} from "../styledComponents/attractionDetails";
import { Label, Title } from "../styledComponents/createAttraction";

class Story extends React.Component {
  state = {
    comment: "",
  };
  componentDidMount() {
    this.props.getStory(this.props.match.params.id);
  }
  renderEditButton(authorId, _id) {
    if (this.props.user.id !== authorId) return <div />;
    return (
      <Link
        style={{
          margin: "auto",
          textDecoration: "none",
          color: "white",
          backgroundColor: "#fde68a",
          padding: "0.8rem 2rem",
          borderRadius: "18px",
          marginBottom: "20px",
          width: 75,
          display: "block",
        }}
        to={`/user/stories/${_id}/edit`}
      >
        Edit
      </Link>
    );
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
    if (!story) return <div />;
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
        <Title className={styles["title"]} style={{margin:'1rem'}}>{title}</Title>
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
        <div style={{ display: "flex", justifyContent: "center" }}></div>

        <div
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            gap:'10px'
          }}
        >
          {tags.map((tag, i) => (
            <span key={i}>
              <Link className={styles[`tag`]} to={`/stories/tag/${tag}`}>
                {tag}
              </Link>
            </span>
          ))}
        </div>
        {this.renderEditButton(author._id, _id)}
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
           {likes.length} { likes.length>1 ||likes.length===0?'Likes':'Like'} 
          </button>
          <button
            className={styles["button"]}
            onClick={() => {
              this.props.dislikeStory(_id);
            }}
          >
   {dislikes.length} { dislikes.length>1 ||dislikes.length===0?'Dislikes':'Dislike'}        </button>
        </div>
        <div>
          {
            this.props.user.loggedIn?
            <div style={{ width: "50rem", margin: "auto" ,marginBottom:'5rem'}}>
            <textarea
              style={{ marginBottom: "20px", height: "10rem" }}
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
              style={{ display: "block", width: "100px", margin: "auto" }}
            >
              Submit
            </button>
          </div>:<AddReview style={{ margin: "auto", width: "40rem" }}>
          <Label style={{marginBottom:'30px'}}>Log in or Signup to leave a review</Label>

          <div style={{width:'320px',margin:'auto',marginBottom:'30px',display:'felx'}}>
          <LoginButton>
            <Link className="link" to="/login">
              Login
            </Link>
          </LoginButton>
          <RegisterButton>
            <Link className="link" to="/register">
              SIGN UP
            </Link>
          </RegisterButton>
          </div>
        </AddReview>
      }
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
