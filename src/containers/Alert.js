import { connect } from 'react-redux';
import { Alert } from '../components/Modal';
import { closeModal } from '../actions/modal';

const mapStateToProps = ({ modal }) => ({
  ...modal,
  open: modal.open === 'alert',
});

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
