import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { getAllAttractions, createStory } from "../../actions";
import history from "../../history";

class CreateStory extends React.Component {
  state = {
    title: "",
    body: "",
    locationId: "",
    tagTerm: "",
    tags: [],
    publish: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, body, locationId, tags, publish } = this.state;
    if (locationId === "") locationId = this.props.attractions[0]._id;
    this.props.createStory({
      title,
      body,
      locationId,
      tags,
      published: publish,
    });
  };

  componentDidMount() {
    this.props.getAllAttractions();
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
            return <li key={i}>{tag}</li>;
          })}
        </ul>
      </div>
    );
  };

  renderStoryForm = () => {
    let { title, body, publish } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            onChange={({ target }) => this.setState({ title: target.value })}
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
            onChange={() => {
              this.setState({ publish: !publish });
            }}
          />
          <span></span>
        </div>

        <button type="submit">Submit Story</button>
      </form>
    );
  };

  render() {
    if (!this.props.user.loggedIn) {
      history.push("/");
    }
    return <div>{this.renderStoryForm()}</div>;
  }
}

export default connect(
  ({ attractions, user }) => {
    return { attractions: _.values(attractions), user };
  },
  { getAllAttractions, createStory }
)(CreateStory);
