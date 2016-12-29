import React, { PropTypes } from 'react';
import BookmarkListItem from './BookmarkListItem';

const BookmarkList = ({ bookmarks }) => (
  <div>
    {bookmarks.map(bookmark => <BookmarkListItem {...bookmark} key={bookmark.id} />)}
  </div>
);

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape(BookmarkListItem.propTypes)).isRequired,
};

export default BookmarkList;
