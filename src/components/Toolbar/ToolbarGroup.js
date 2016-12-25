import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cn from 'classnames';
import s from './ToolbarGroup.css';

const ToolbarGroup = ({ children, fullWidth = false }) => (
  <div className={cn(s.root, fullWidth && s.fullWidth)}>
    {children}
  </div>
);

ToolbarGroup.propTypes = {
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
};

export default withStyles(s)(ToolbarGroup);
