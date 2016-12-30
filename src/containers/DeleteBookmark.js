import { connect } from 'react-redux';
import DeleteButton from '../components/Bookmark/DeleteBookmark';
import request from '../core/request';
import modal from '../core/modal';
import { receiveBookmarks } from '../actions/bookmarks';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onRequestDelete: async ({ id, name }) => {
    const { confirm } = modal(dispatch);
    if (await confirm(`Delete ${name}?`)) {
      await request.del(`/rest/bookmarks/${id}`).send();
      const result = await request.get('/rest/bookmarks').send();
      dispatch(receiveBookmarks(result));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
