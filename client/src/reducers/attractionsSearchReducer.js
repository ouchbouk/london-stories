import _ from "lodash";

function attractionsSearchReducer(state = {}, { type, payload }) {
  switch (type) {
    case "ATTRACTIONS_SEARCH_RESULTS":
      return { ..._.mapKeys(payload, "_id") };

    default:
      return state;
  }
}

export default attractionsSearchReducer;
