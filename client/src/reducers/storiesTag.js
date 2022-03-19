import _ from "lodash";
function storiesTag(state = {}, { type, payload }) {
  switch (type) {
    case "STORIES_TAG":
      return { ..._.mapKeys(payload, "_id") };
    default:
      return state;
  }
}

export default storiesTag;
