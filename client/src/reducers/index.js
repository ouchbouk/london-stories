import { combineReducers } from "redux";
import user from "./userReducer";
import attractions from "./attractionsReducer";
import attractionsSearch from "./attractionsSearchReducer";
import addresses from "./addressesReducer";
import AttractionCountReducer from "./AttractionCountReducer";
import flashMessageReducer from "./flashMessageReducer";
import queryReducer from "./queryReducer";
import storiesReducer from "./storiesReducer";
import attractionStories from "./attractionStories";
import searchStories from "./searchStories";
import storiesTag from "./storiesTag";
import userStories from "./userStories";

export default combineReducers({
  user,
  attractions,
  attractionsSearchResults: attractionsSearch,
  addresses,
  attractionsCount: AttractionCountReducer,
  flashMessage: flashMessageReducer,
  query: queryReducer,
  stories: storiesReducer,
  attractionStories,
  searchStories,
  storiesTag: storiesTag,
  userStories,
});
