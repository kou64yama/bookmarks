import { connect } from 'react-redux';
import { BookmarkForm } from '../components/Bookmark';
import request from '../core/request';
import modal from '../core/modal';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onRequestSubmit: async (payload) => {
    try {
      await request.post('/rest/bookmarks').send(payload);
    } catch (err) {
      modal(dispatch).alert(err);
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkForm);
