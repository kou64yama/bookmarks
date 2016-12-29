import { connect } from 'react-redux';
import { BookmarkForm } from '../components/Bookmark';
import request from '../core/request';

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({
  onRequestSubmit: payload => request.post('/rest/bookmarks').send(payload),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkForm);
