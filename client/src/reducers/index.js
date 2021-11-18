import { combineReducers } from "redux";
import user from "./userReducer";
import attractions from "./attractionsReducer";
import attractionsSearch from "./attractionsSearchReducer";
import addresses from "./addressesReducer";
import AttractionCountReducer from "./AttractionCountReducer";
import flashMessageReducer from "./flashMessageReducer";
import queryReducer from "./queryReducer";

export default combineReducers({
  user,
  attractions,
  attractionsSearchResults: attractionsSearch,
  addresses,
  attractionsCount: AttractionCountReducer,
  flashMessage: flashMessageReducer,
  query: queryReducer,
});
