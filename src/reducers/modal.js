import {
  OPEN_ALERT,
  CLOSE_ALERT,
} from '../constants';

const initialState = {
  open: false,
  message: undefined,
  resolve: undefined,
};

export default function modal(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_ALERT:
      return {
        ...payload,
        open: true,
      };
    case CLOSE_ALERT:
      return initialState;
    default:
      return state;
  }
}
