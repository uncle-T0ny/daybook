import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import saga from './saga/rootSaga.js';
import reducer from './reducers/rootReducer.js';


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(saga);
  return store;
}

export {
  configureStore
}
