export default function addressReducer(state = [], { type, payload }) {
  switch (type) {
    case "GET_ADDRESSES":
      return payload;
    default:
      return state;
  }
}
