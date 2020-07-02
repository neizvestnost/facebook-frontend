import { SAVE_POSTS } from "../actions/posts"

const initialState = {
  posts: []
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POSTS:
      return {
        posts: [ ...action.payload ]
      }
    default:
      return state
    }
}
