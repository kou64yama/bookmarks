import { openAlert, openConfirm, openPrompt } from '../actions/modal';

function ensureOptions(options = {}) {
  if (options instanceof Error) {
    return {
      message: process.env.NODE_ENV !== 'production' ? options.stack : options.message,
      title: options.name,
    };
  }

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
