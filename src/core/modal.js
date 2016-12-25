import { openAlert } from '../actions/modal';

function alert(dispatch) {
  return (options = {}) => new Promise((resolve) => {
    if (typeof options !== 'object') {
        // eslint-disable-next-line no-param-reassign
      options = { message: String(options) };
    }

    dispatch(openAlert({ ...options, resolve }));
  });
}

export default function modal(dispatch) {
  return { alert: alert(dispatch) };
}
