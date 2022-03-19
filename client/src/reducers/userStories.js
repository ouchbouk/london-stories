import _ from "lodash";
function userStories(state = {}, { type, payload }) {
  switch (type) {
    case "USER_STORIES":
      return { ..._.mapKeys(payload, "_id") };
    default:
      return state;
  }
}

export default userStories;
