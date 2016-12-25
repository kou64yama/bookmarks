import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TextField.css';

const TextField = props => (
  <div className={s.root}>
    <input {...props} type="text" className={s.input} />
  </div>
);

export default withStyles(s)(TextField);
