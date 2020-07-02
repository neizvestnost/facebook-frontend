import { takeEvery, call, put, all } from 'redux-saga/effects'
import axios from './utils/API'
import { saveUser } from './actions/user'
import { savePosts } from './actions/posts'
import { FETCH_DASHBOARD } from './actions/dashboard'


export function* watchFetchDashboard() {
  yield takeEvery(FETCH_DASHBOARD, fetchDashboard)
}

function* fetchDashboard() {
  const response = yield call(requestDashboard)
  yield put(saveUser(response.data.user.data.attributes))
  const formattedPosts = yield call(() => formatPosts(response))
  yield put(savePosts(formattedPosts))
}

const formatPosts = response => {
  return response.data.user.included.map(post => {
    if (post) {
      return { id: post.id, title: post.attributes.title, body: post.attributes.body }
    }

    return post
  })
}

async function requestDashboard() {
  return await axios.get('/dashboard')
}

// export function* rootSaga() {
//   yield all([
//     watchFetchDashboard
//   ])
// }
