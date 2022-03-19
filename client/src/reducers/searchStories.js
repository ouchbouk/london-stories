import _ from "lodash";

function searchStories(state = {}, { type, payload }) {
  switch (type) {
    case "SEARCH_STORIES":
      return { ..._.mapKeys(payload, "_id") };
    default:
      return state;
  }
}

export default searchStories;
