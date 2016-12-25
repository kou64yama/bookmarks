import {
  CHANGE_AUTH_STATUS,
} from '../constants';

const initialState = {
};

export default function user(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_AUTH_STATUS:
      return payload;
    default:
      return state;
  }
}
