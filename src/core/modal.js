import { openAlert, openConfirm, openPrompt } from '../actions/modal';

function ensureOptions(options = {}) {
  return typeof options === 'object' ? options : { message: String(options) };
}

function alert(dispatch) {
  return (options = {}) => new Promise((resolve) => {
    dispatch(openAlert({ ...ensureOptions(options), resolve }));
  });
}

function confirm(dispatch) {
  return (options = {}) => new Promise((resolve) => {
    dispatch(openConfirm({ ...ensureOptions(options), resolve }));
  });
}

function prompt(dispatch) {
  return (options = {}) => new Promise((resolve) => {
    dispatch(openPrompt({ ...ensureOptions(options), resolve }));
  });
}

export default function modal(dispatch) {
  return {
    alert: alert(dispatch),
    confirm: confirm(dispatch),
    prompt: prompt(dispatch),
  };
}
