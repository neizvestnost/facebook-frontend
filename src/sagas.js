import { takeEvery, call, put, all } from 'redux-saga/effects'
import axios from './utils/API'
import { saveUser } from './actions/user'
import { savePosts, filterPosts } from './actions/posts'
import { FETCH_DASHBOARD } from './actions/dashboard'
import { FILTER_POSTS } from './actions/posts'

export function* watchFetchDashboard() {
  yield takeEvery(FETCH_DASHBOARD, fetchDashboard)
}

export function* watchFilterPosts() {
  yield takeEvery(FILTER_POSTS, fetchFilteredPosts)
}

function* fetchDashboard() {
  const response = yield call(requestDashboard)
  yield put(saveUser(response.data.user.data.attributes))
  const formattedPosts = yield call(() => formatPosts(response))
  yield put(savePosts(formattedPosts))
}

const formatPosts = response => {
  return response.data.posts.data.map(post => {
    if (post) {
      return { id: post.id, title: post.attributes.title, body: post.attributes.body }
    }

    return post
  })
}

async function requestDashboard() {
  return await axios.get('/dashboard')
}

function* fetchFilteredPosts(action) {
  const response = yield call(() => requestFilterPosts(action.payload))
  const formattedPosts = yield call(() => formatPosts(response))
  yield put(savePosts(formattedPosts))
}

async function requestFilterPosts(search) { return await axios.get('/dashboard', { params: search.length > 0 ? { search: search } : '' } ) }

export function* rootSaga() {
  yield all([
    watchFetchDashboard(),
    watchFilterPosts()
  ])
}
