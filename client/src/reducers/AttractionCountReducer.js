function AttractionCountReducer(state = { count: 0 }, { type, payload }) {
  switch (type) {
    case "GET_ATTRACTION_COUNT":
      return { count: payload };
    default:
      return state;
  }
}

export default AttractionCountReducer;
