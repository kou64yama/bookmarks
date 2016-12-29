import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import s from './Modal.css';

const Confirm = ({ message, resolve, onRequestClose, ...others }) => {
  const createHandler = result => () => {
    if (onRequestClose) {
      onRequestClose();
    }
    if (resolve) {
      resolve(result);
    }
  };
  const handleOk = createHandler(true);
  const handleCancel = createHandler(false);

  const actions = [
    <RaisedButton label="Cancel" onTouchTap={handleCancel} />,
    <RaisedButton label="OK" onTouchTap={handleOk} primary />,
  ];

  return (
    <Dialog
      {...others}
      onRequestClose={handleCancel}
      actions={actions}
      modal
    >
      <div className={s.message}>{message}</div>
    </Dialog>
  );
};

Confirm.propTypes = {
  ...Dialog.propTypes,
  message: PropTypes.string,
  resolve: PropTypes.func,
};

export default withStyles(s)(Confirm);
