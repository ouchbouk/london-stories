function userReducer(state = { loggedIn: false }, { type, payload }) {
  switch (type) {
    case "REGISTER":
      return { ...payload, loggedIn: true };
    case "LOG_IN":
      return { ...payload, loggedIn: true };
    case "LOG_OUT":
      return { loggedIn: false };
    case "UPDATE_USER_LIST":
      return { ...state, ...payload };
    case "ERROR":
      return { error: payload };
    default:
      return state;
  }
}

export default userReducer;
