import _ from "lodash";

function attractionStories(state = {}, { type, payload }) {
  switch (type) {
    case "ATTRACTION_STORIES":
      return { ..._.mapKeys(payload, "_id") };
    default:
      return state;
  }
}

export default attractionStories;
