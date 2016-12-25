import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from 'material-ui/Paper';
import s from './Toolbar.css';

const Toolbar = ({ children, ...others }) => (
  <Paper {...others}>
    <div className={s.toolbar}>
      {children}
    </div>
  </Paper>
);

Toolbar.propTypes = {
  ...Paper.propTypes,
  children: PropTypes.node,
};

export default withStyles(s)(Toolbar);
