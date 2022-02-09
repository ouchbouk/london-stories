import React from "react";
import { connect } from "react-redux";
import { getStoriesByTag } from "../../actions";
import _ from "lodash";
import { Link } from "react-router-dom";

class StoriesTag extends React.Component {
  componentDidMount() {
    this.props.getStoriesByTag(this.props.match.params.tag);
  }

  renderStories() {
    if (!this.props.stories) return <div>Loading</div>;
    return (
      <ul>
        {this.props.stories.map(({ title, _id }, i) => {
          return (
            <li key={i}>
              <Link to={`/stories/${_id}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        Stories
        {this.renderStories()}
      </div>
    );
  }
}

export default connect(
  ({ stories }) => {
    return { stories: _.values(stories) };
  },
  { getStoriesByTag }
)(StoriesTag);
