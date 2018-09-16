import { combineReducers } from 'redux';

import { appReducer } from './appReducer.js';
import { subjectsReducer } from './subjectsReducer';
import { daybookReducer } from './daybookReducer';

const rootReducer = combineReducers({
  app: appReducer,
  subjects: subjectsReducer,
  daybook: daybookReducer
});

export default rootReducer;
