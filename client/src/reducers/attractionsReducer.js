import _ from "lodash";

function attractions(state = {}, { type, payload }) {
  switch (type) {
    case "CREAT_ATTRACTION":
      return { ...state, [payload._id]: payload };
    case "GET_ATTRACTIONS":
      return { ...state, ..._.mapKeys(payload, "_id") };
    case "GET_ATTRACTION":
      return { ...state, [payload._id]: payload };
    case "DELETE_ATTRACTION":
      return _.omit(state, payload._id);
    default:
      return state;
  }
}

export default attractions;
