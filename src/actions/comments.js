export const SHOW_COMMENTS = 'SHOW_COMMENTS'
export const SAVE_COMMENTS = 'SAVE_COMMENTS'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'

export const showComments = posts => {
  return {
    type: SHOW_COMMENTS,
    payload: posts
  }
}

// export const fetchComments = postId => {
//   return {
//     type: FETCH_COMMENTS,
//     payload: postId
//   }
// }

// export const saveComments = comments => {
//   return {
//     type: SAVE_COMMENTS,
//     payload: comments
//   }
// }