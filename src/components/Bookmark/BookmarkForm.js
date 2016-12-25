import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Form, FormText, FormActions } from '../Form';
import Link from '../Link';

const BookmarkForm = ({ onRequestSubmit }) => {
  let name;
  let url;
  let description;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onRequestSubmit) {
      onRequestSubmit({
        name: name.getValue(),
        url: url.getValue(),
        description: description.getValue(),
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormText>
        <TextField
          floatingLabelText="Name"
          fullWidth
          ref={node => (name = node)}
        />
        <TextField
          floatingLabelText="URL"
          fullWidth
          ref={node => (url = node)}
        />
        <TextField
          floatingLabelText="Description"
          rows={4}
          rowsMax={4}
          multiLine
          fullWidth
          ref={node => (description = node)}
        />
      </FormText>
      <FormActions>
        <RaisedButton label="Cancel" containerElement={<Link to="/" />} />
        <RaisedButton label="OK" type="submit" primary />
      </FormActions>
    </Form>
  );
};

BookmarkForm.propTypes = {
  onRequestSubmit: PropTypes.func,
};

export default BookmarkForm;
