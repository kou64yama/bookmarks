import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Edit.css';
import EditBookmark from '../../containers/EditBookmark';

const Edit = props => (
  <div className={s.root}>
    <div className={s.container}>
      <EditBookmark {...props} />
    </div>
  </div>
);

Edit.propTypes = {};

export default withStyles(s)(Edit);
