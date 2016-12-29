import { connect } from 'react-redux';
import BookmarkList from '../components/Bookmark/BookmarkList';

const mapStateToProps = ({ bookmarks }) => ({ bookmarks });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);
