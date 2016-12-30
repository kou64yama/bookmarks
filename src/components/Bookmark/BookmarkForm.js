import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Form, FormText, FormActions } from '../Form';
import Link from '../Link';
import history from '../../core/history';

class BookmarkForm extends Component {
  static propTypes = {
    onRequestSubmit: PropTypes.func,
    defaultValue: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      description: PropTypes.string,
    }),
  }

  state = {
    disabled: false,
    error: undefined,
  }

  async handleSubmit(event) {
    try {
      event.preventDefault();
      this.setState({ disabled: true, error: undefined });

      const { onRequestSubmit } = this.props;
      if (onRequestSubmit) {
        const payload = {
          name: this.name.getValue(),
          url: this.url.getValue(),
          description: this.description.getValue(),
        };
        await onRequestSubmit(payload);
        history.push('/');
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ disabled: false });
    }
  }

  createErrorMap() {
    const map = {};
    if (!this.state.error || !this.state.error.errors) {
      return map;
    }

    this.state.error.errors.forEach(({ path, message }) => {
      map[path] = message;
    });
    return map;
  }

  render() {
    const { defaultValue = {} } = this.props;
    const { disabled } = this.state;
    const errorMap = this.createErrorMap();

    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
        <FormText>
          <TextField
            floatingLabelText="Name"
            defaultValue={defaultValue.name}
            errorText={errorMap.name}
            disabled={disabled}
            fullWidth
            ref={node => (this.name = node)}
          />
          <TextField
            floatingLabelText="URL"
            defaultValue={defaultValue.url}
            errorText={errorMap.url}
            disabled={disabled}
            fullWidth
            ref={node => (this.url = node)}
          />
          <TextField
            floatingLabelText="Description"
            defaultValue={defaultValue.description}
            errorText={errorMap.description}
            rows={4}
            rowsMax={4}
            disabled={disabled}
            multiLine
            fullWidth
            ref={node => (this.description = node)}
          />
        </FormText>
        <FormActions>
          <RaisedButton label="Cancel" containerElement={<Link to="/" />} />
          <RaisedButton label="OK" type="submit" disabled={this.state.disabled} primary />
        </FormActions>
      </Form>
    );
  }
}

export default BookmarkForm;
