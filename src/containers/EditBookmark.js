import { connect } from 'react-redux';
import { BookmarkForm } from '../components/Bookmark';
import request from '../core/request';

const mapStateToProps = (state, { id }) => ({
  onRequestSubmit: payload => request.put(`/rest/bookmarks/${id}`).send(payload),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkForm);
