import { createAction } from 'redux-actions';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants';

const payloadCreator = open => payload => ({ ...payload, open });

export const openAlert = createAction(OPEN_MODAL, payloadCreator('alert'));
export const openConfirm = createAction(OPEN_MODAL, payloadCreator('confirm'));
export const openPrompt = createAction(OPEN_MODAL, payloadCreator('prompt'));
export const closeModal = createAction(CLOSE_MODAL);
