import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FormText.css';

const FormText = ({ children }) => (
  <div className={s.root}>
    {children}
  </div>
);

FormText.propTypes = {
  children: PropTypes.node,
};

export default withStyles(s)(FormText);
