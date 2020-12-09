import { combineReducers } from 'redux';
import itemReducer from './exerciseReducer';
import exerciseReducer from './exerciseReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  item: itemReducer,
  exercise: exerciseReducer,
  error: errorReducer,
  auth: authReducer
});
