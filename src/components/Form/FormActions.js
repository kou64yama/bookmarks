import React, { PropTypes, Children } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FormActions.css';

const FormActions = ({ children }) => (
  <div className={s.root}>
    {Children.map(children, c => React.cloneElement(c, { className: s.action }))}
  </div>
);

FormActions.propTypes = {
  children: PropTypes.node,
};

export default withStyles(s)(FormActions);
