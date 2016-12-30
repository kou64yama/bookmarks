import { connect } from 'react-redux';
import { BookmarkForm } from '../components/Bookmark';
import request from '../core/request';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, { id }) => ({
  onRequestSubmit: payload => request.put(`/rest/bookmarks/${id}`).send(payload),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkForm);
