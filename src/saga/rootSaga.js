import { takeLatest } from 'redux-saga/effects';

function* rootSaga() {
  yield takeLatest('APP_STARTED', appStarted);
}

function appStarted() {
  console.log('APP STARTED ACTION');
}

export default rootSaga;
