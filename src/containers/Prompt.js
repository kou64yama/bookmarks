import { connect } from 'react-redux';
import { Prompt } from '../components/Modal';
import { closeModal } from '../actions/modal';

const mapStateToProps = ({ modal }) => ({
  ...modal,
  open: modal.open === 'prompt',
});

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prompt);
