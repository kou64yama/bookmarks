import { connect } from 'react-redux';
import { Confirm } from '../components/Modal';
import { closeModal } from '../actions/modal';

const mapStateToProps = ({ modal }) => ({
  ...modal,
  open: modal.open === 'confirm',
});

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
