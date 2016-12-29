import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BookmarkListItem.css';

const BookmarkListItem = ({ id, name, url }) => (
  <a
    className={s.root}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    onTouchTap={(event) => {
      event.preventDefault();
      window.open(`/redirect/${id}`);
    }}
  >
    <div>{name}</div>
  </a>
);

BookmarkListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(s)(BookmarkListItem);
