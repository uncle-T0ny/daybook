import { fork, takeLatest } from 'redux-saga/effects';

import subjectsSaga from './subjectsSaga';


function* rootSaga() {
  yield takeLatest('APP_STARTED', appStarted);
  yield fork(subjectsSaga);
}

function appStarted() {
  console.log('APP STARTED ACTION');
}

export default rootSaga;
