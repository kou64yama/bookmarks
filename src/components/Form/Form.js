import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';

const Form = ({ children, action, method, onSubmit, ...others }) => (
  <Paper {...others}>
    <form action={action} method={method} onSubmit={onSubmit}>
      {children}
    </form>
  </Paper>
);

Form.propTypes = {
  ...Paper.propTypes,
  action: PropTypes.string,
  method: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Form;
