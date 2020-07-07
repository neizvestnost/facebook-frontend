import { SAVE_POSTS } from "../actions/posts"
import { SHOW_COMMENTS } from "../actions/comments"

const initialState = {
  posts: []
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POSTS:
      return {
        posts: [ ...action.payload ]
      }
    case SHOW_COMMENTS:
      return {
        posts: action.payload
      }
    default:
      return state
    }
}
