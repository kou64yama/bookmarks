import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants';

const initialState = {
  open: undefined,
  message: undefined,
  resolve: undefined,
};

export default function modal(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_MODAL:
      return {
        ...payload,
      };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}
