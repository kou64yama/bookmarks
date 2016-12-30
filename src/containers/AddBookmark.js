import { connect } from 'react-redux';
import { BookmarkForm } from '../components/Bookmark';
import request from '../core/request';

const mapStateToProps = () => ({
  onRequestSubmit: payload => request.post('/rest/bookmarks').send(payload),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkForm);
