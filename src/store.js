import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import saga from './saga/rootSaga.js';
import reducer from './reducers/rootReducer.js';


const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(saga);
  return store;
}

export {
  configureStore
}
