import { combineReducers } from '@reduxjs/toolkit';
import authPersistReducer from './auth-persist.reducer';
import appReducer from './app.reducer';

const rootReducer = combineReducers({
  authPersist: authPersistReducer,
  app: appReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;