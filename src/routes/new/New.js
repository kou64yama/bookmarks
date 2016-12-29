import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './New.css';
import AddBookmark from '../../containers/AddBookmark';

const New = () => (
  <div className={s.root}>
    <div className={s.container}>
      <AddBookmark />
    </div>
  </div>
);

New.propTypes = {};

export default withStyles(s)(New);
