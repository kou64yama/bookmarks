import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';

const DeleteBookmark = ({ onRequestDelete = () => {}, bookmark, ...others }) => (
  <IconButton
    {...others}
    onTouchTap={() => onRequestDelete(bookmark)}
  />
);

DeleteBookmark.propTypes = {
  onRequestDelete: PropTypes.func,
  bookmark: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteBookmark;
