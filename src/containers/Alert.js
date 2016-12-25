import { connect } from 'react-redux';
import { Alert } from '../components/Modal';
import { closeAlert } from '../actions/modal';

const mapStateToProps = ({ modal }) => modal;

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(closeAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
