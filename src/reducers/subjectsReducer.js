import { bindActionCreators } from 'redux';
import R from 'ramda';

import { subjectActions } from './../saga/actions.js';
import { actions } from './../components/Subjects/AddEditSubject';


export let subjectsActions = {
  addSubject(name) {
    return { type: subjectActions.ADD_SUBJECT, name };
  },

  editSubject(id, name) {
    return { type: subjectActions.EDIT_SUBJECT, id, name };
  },

  deleteSubject(id) {
    return { type: subjectActions.DELETE_SUBJECT, id };
  },

  updateState(object) {
    return { type: subjectActions.UPDATE_STATE, object };
  },
};

export function bindSubjectActions(dispatch) {
  subjectsActions = bindActionCreators(subjectsActions, dispatch);
}

const initState = {
  subjectAction: actions.nope,
  subjectName: '',

  // [{ id: Date.now(), name: 'Teacher name' }]
  list: []
};

export function subjectsReducer(state = initState, action) {
  switch (action.type) {
    case subjectActions.ADD_SUBJECT:
      const newList = state.list.slice();
      newList.unshift({ id: Date.now(), name: action.name });

      return {
        ...state,
        list: newList
      };
    case subjectActions.EDIT_SUBJECT:
      const editedList = R.curry(() => R.map(
        R.when(R.propEq('id', action.id), R.assoc('name', action.name)),
        state.list
      ))();

      return {
        ...state,
        list: editedList
      };
    case subjectActions.DELETE_SUBJECT:
      return {
        ...state,
        list: R.filter((el) => el.id !== action.id, state.list)
      };
    case subjectActions.UPDATE_STATE:
      return { ...state, ...action.object };
    default:
      return state;
  }
}
