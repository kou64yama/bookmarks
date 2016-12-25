import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import s from './Modal.css';

const Alert = ({ message, resolve, onRequestClose, ...others }) => {
  const handleClose = () => {
    if (onRequestClose) {
      onRequestClose();
    }
    if (resolve) {
      resolve();
    }
  };

  const actions = [
    <RaisedButton label="OK" onTouchTap={handleClose} primary />,
  ];

  return (
    <Dialog
      {...others}
      bodyClassName={s.body}
      onRequestClose={handleClose}
      actions={actions}
      modal
    >
      {message}
    </Dialog>
  );
};

Alert.propTypes = {
  ...Dialog.propTypes,
  message: PropTypes.string,
  resolve: PropTypes.func,
};

export default withStyles(s)(Alert);
