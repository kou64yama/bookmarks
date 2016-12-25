import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from 'material-ui/Paper';
import s from './Toolbar.css';

const Toolbar = ({ children }) => (
  <div className={s.root}>
    <Paper>
      <div className={s.toolbar}>
        {children}
      </div>
    </Paper>
  </div>
);

Toolbar.propTypes = {
  children: PropTypes.node,
};

export default withStyles(s)(Toolbar);
