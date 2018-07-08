import { bindActionCreators } from 'redux';

import { appActions } from './../saga/actions.js';


export let appReduxActions = {
  appStarted() {
    return { type: appActions.APP_STARTED };
  },
};

export function bindAppActions(dispatch) {
  appReduxActions = bindActionCreators(appReduxActions, dispatch);
}

const initState = {

};

export function appReducer(state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
