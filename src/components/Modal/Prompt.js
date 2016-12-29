import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import s from './Modal.css';

const Confirm = ({ message, resolve, onRequestClose, ...others }) => {
  let input;
  const handleOk = () => {
    if (onRequestClose) {
      onRequestClose();
    }
    if (resolve) {
      resolve(input.getValue());
    }
  };
  const handleCancel = () => {
    if (onRequestClose) {
      onRequestClose();
    }
    if (resolve) {
      resolve(null);
    }
  };

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
      <TextField ref={node => (input = node)} fullWidth />
    </Dialog>
  );
};

Confirm.propTypes = {
  ...Dialog.propTypes,
  message: PropTypes.string,
  resolve: PropTypes.func,
};

export default withStyles(s)(Confirm);
