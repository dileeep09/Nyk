import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import mmkvStoarge from './StorageEngine';
import Reducers from './Reducers';
const config = {
  key: 'root',
  storage: mmkvStoarge
};

const persistReduce = persistReducer(config, Reducers);

const store = configureStore({
  reducer: persistReduce,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persister = persistStore(store);

export {store, persister};