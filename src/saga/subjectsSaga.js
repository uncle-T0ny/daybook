import { all, takeLatest } from 'redux-saga/effects';
import { subjectActions  } from './actions';

export default function* subjectsSaga() {
  yield all([
    yield takeLatest(subjectActions.ADD_SUBJECT, handleAddSubject),
  ]);
}

function* handleAddSubject() {
  console.log('ADD SUBJECT');
}