import { bindActionCreators } from 'redux';
import R from 'ramda';

import { subjectActions } from './../saga/actions.js';


export let subjectsActions = {
  addSubject(name) {
    return { type: subjectActions.ADD_SUBJECT, name };
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
  isAddingSubject: false,
  newSubjectName: '',

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
