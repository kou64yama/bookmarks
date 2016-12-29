import { combineReducers } from 'redux';
import modal from './modal';
import user from './user';
import bookmarks from './bookmarks';

export default combineReducers({
  modal,
  user,
  bookmarks,
});
