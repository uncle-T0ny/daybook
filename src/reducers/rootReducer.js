import { combineReducers } from 'redux';

import { appReducer } from './appReducer.js';
import { subjectsReducer } from './subjectsReducer';

const rootReducer = combineReducers({
  app: appReducer,
  subjects: subjectsReducer
});

export default rootReducer;
