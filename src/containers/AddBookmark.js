import { connect } from 'react-redux';
import { BookmarkForm } from '../components/Bookmark';
import modal from '../core/modal';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onRequestSubmit: async (payload) => {
    const { alert } = modal(dispatch);
    await alert(JSON.stringify(payload, null, 2));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkForm);
