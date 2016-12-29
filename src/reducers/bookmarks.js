import { RECEIVE_BOOKMAKRS } from '../constants';

export default function bookmarks(state = [], { type, payload }) {
  switch (type) {
    case RECEIVE_BOOKMAKRS:
      return payload;
    default:
      return state;
  }
}
