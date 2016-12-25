import { createAction } from 'redux-actions';
import {
  OPEN_ALERT,
  CLOSE_ALERT,
} from '../constants';

export const openAlert = createAction(OPEN_ALERT);
export const closeAlert = createAction(CLOSE_ALERT);
