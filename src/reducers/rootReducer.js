import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postsReducer } from "./postReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer
})