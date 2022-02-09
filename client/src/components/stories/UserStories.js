import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { getUserStories } from "../../actions";
import { Link } from "react-router-dom";

const UserStories = (props) => {
  useEffect(() => {
    let id = props.match.params.id;
    props.getUserStories(id);
  }, []);

  let { stories } = props;

  if (!stories) return <div>NO STORIES </div>;

  return (
    <div>
      {stories.map(({ title, _id }) => {
        return <Link to={`/stories/${_id}`}>{title}</Link>;
      })}
    </div>
  );
};

export default connect(
  ({ stories }, ownProps) => {
    return {
      stories: _.values(stories).filter(
        ({ author }) => author === ownProps.match.params.id
      ),
    };
  },
  { getUserStories }
)(UserStories);
