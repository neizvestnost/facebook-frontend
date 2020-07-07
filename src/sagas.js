import { takeEvery, call, put, all } from 'redux-saga/effects'
import axios from './utils/API'
import { saveUser } from './actions/user'
import { savePosts } from './actions/posts'
import { FETCH_DASHBOARD } from './actions/dashboard'
import { FILTER_POSTS } from './actions/posts'
import { saveComments, FETCH_COMMENTS } from './actions/comments'

export function* watchFetchDashboard() {
  yield takeEvery(FETCH_DASHBOARD, fetchDashboard)
}

export function* watchFilterPosts() {
  yield takeEvery(FILTER_POSTS, fetchFilteredPosts)
}

// export function* watchFetchComments() {
//   yield takeEvery(FETCH_COMMENTS, fetchCommentsToPost)
// }

// function* fetchCommentsToPost(action) {
//   const response = yield call(() => requestComments(action.payload))
//   const formattedComments = yield call(() => formatComments(response))
//   yield put(saveComments(formattedComments))
// }

function* fetchDashboard() {
  const response = yield call(requestDashboard)
  yield put(saveUser(response.data.user.data.attributes))
  const formattedPosts = yield call(() => formatPosts(response))
  yield put(savePosts(formattedPosts))
}

const formatPosts = response => {
  return response.data.posts.data.map(post => {
    if (post) {
      return { 
        id: parseInt(post.id), 
        title: post.attributes.title, 
        body: post.attributes.body, 
        author: post.attributes.author, 
        showComments: false 
      }
    }

    return post
  })
}

// const formatComments = response => {
//   return response.data.comments.data.map(comment => {
//     return {
//       id: comment.attributes.id,
//       body: comment.attributes.body,
//     }
//   })
// }

async function requestDashboard() {
  return await axios.get('/dashboard')
}

function* fetchFilteredPosts(action) {
  const response = yield call(() => requestFilterPosts(action.payload))
  const formattedPosts = yield call(() => formatPosts(response))
  yield put(savePosts(formattedPosts))
}

async function requestFilterPosts(search) { return await axios.get('/dashboard', { params: search.length > 0 ? { search: search } : '' } ) }

// async function requestComments(postId) {
//   return await axios.get(`/posts/${postId}/comments`)
// }

export function* rootSaga() {
  yield all([
    watchFetchDashboard(),
    watchFilterPosts()
    // watchFetchComments()
  ])
}
