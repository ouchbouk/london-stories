function queryReducer(state = "", { type, payload }) {
  switch (type) {
    
    case "QUERY":
      return payload;
    default:
      return state;
  }
}

export default queryReducer;
