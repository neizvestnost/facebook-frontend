export const SAVE_POSTS = 'SAVE_POSTS'

export const savePosts = (attributes) => {
  return {
    type: SAVE_POSTS,
    payload: attributes
  }
}
