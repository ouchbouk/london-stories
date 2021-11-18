function flashMessageReducer(state = "", { type, payload }) {
  switch (type) {
    case "FLASH_MESSAGE":
      return { data: payload };
    default:
      return state;
  }
}

export default flashMessageReducer;
