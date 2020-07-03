export const SAVE_POSTS = 'SAVE_POSTS'
export const FILTER_POSTS = 'FILTER_POSTS'

export const savePosts = (attributes) => {
  return {
    type: SAVE_POSTS,
    payload: attributes
  }
}

export const filterPosts = (search) => {
  return {
    type: FILTER_POSTS,
    payload: search
  }
}
