import _ from "lodash";

function storiesReducer(state = {}, { type, payload }) {
  switch (type) {
    case "CREATE_STORY":
      return { ...state, [payload._id]: payload };

    case "GET_STORIES":
      return { ...state,..._.mapKeys(payload, "_id") };

    case "GET_STORY":
      return { ...state, [payload._id]: payload };

    case "DELETE_STORY":
      return _.omit(state, payload._id);

    default:
      return state;
  }
}

export default storiesReducer;
