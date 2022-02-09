import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { getUserStory, getAllAttractions, editStory } from "../../actions";
import history from "../../history";

class StoryEdit extends React.Component {
  state = {
    title: undefined,
    body: "",
    locationId: "",
    tagTerm: "",
    tags: [],
    published: false,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getUserStory(id);
    this.props.getAllAttractions();
  }

  static getDerivedStateFromProps({ story }, prevState) {
    if (!prevState.title && story) {
      let { title, body, locationId, tags, published } = story;
      return { title, body, locationId, tags, published };
    }
    return null;
  }

  renderAttractionsDropdown = () => {
    let attractions = this.props.attractions;
    if (attractions) {
      return (
        <div>
          <label>Location</label>
          <select
            onClick={(e) => {
              this.setState({ locationId: e.target.value });
            }}
          >
            {attractions.map(({ _id, name }) => {
              return (
                <option value={_id} key={_id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      );
    }
  };
  renderTagsInput = () => {
    let { tagTerm, tags } = this.state;
    return (
      <div>
        <label>Tags</label>
        <input
          type="text"
          onChange={({ target }) => this.setState({ tagTerm: target.value })}
          value={tagTerm}
        />
        <button
          type="button"
          style={{ display: "inline" }}
          onClick={() => {
            this.setState({ tags: [...tags, tagTerm] });
            this.setState({ tagTerm: "" });
          }}
        >
          Add tag
        </button>
        <ul>
          {tags.map((tag, i) => {
            return (
              <li key={i}>
                {tag}
                <span
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    let tags = this.state.tags;
                    tags.splice(i, 1);
                    this.setState({ tags });
                  }}
                >
                  Delete
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  handleSubmit(e) {
    e.preventDefault();
    let { title, body, locationId, tags, published } = this.state;
    let id = this.props.match.params.id;
    this.props.editStory(id, { title, body, locationId, tags, published });
  }

  renderEditForm() {
    
    if (!this.props.user.loggedIn) {
      history.push("/");
    }
    if (!this.props.story) return "loading";
    let { title, body, published } = this.state;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <label>Title</label>
          <input
            type="text"
            onChange={({ target }) => {
              this.setState({ title: target.value });
            }}
            value={title}
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            type="text"
            onChange={({ target }) => this.setState({ body: target.value })}
            value={body}
          />
        </div>
        {this.renderAttractionsDropdown()}
        {this.renderTagsInput()}
        <div>
          <label>Publish</label>
          <input
            type="checkbox"
            checked={published}
            onChange={() => {
              this.setState({ published: !published });
            }}
          />
        </div>

        <button type="submit">Edit Story</button>
      </form>
    );
  }

  render() {
    return (
      <div>
        Edit
        {this.renderEditForm()}
      </div>
    );
  }
}

export default connect(
  ({ stories, attractions, user }, ownProps) => {
    console.log(ownProps.match.params.id);
    return {
      story: stories[ownProps.match.params.id],
      attractions: _.values(attractions),
      user,
    };
  },
  { getUserStory, getAllAttractions, editStory }
)(StoryEdit);
