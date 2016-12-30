import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import IconButton from 'material-ui/IconButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import moment from 'moment';
import s from './BookmarkListItem.css';
import Link from '../Link';
import DeleteBookmark from '../../containers/DeleteBookmark';

class BookmarkListItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    lastAccessAt: PropTypes.string,
  }

  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleLink = (event) => {
    const { id } = this.props;
    event.preventDefault();
    window.open(`/redirect/${id}`);
  }

  renderExpanded() {
    if (!this.state.open) {
      return undefined;
    }

    const { id, description, lastAccessAt } = this.props;
    return (
      <div className={s.expanded}>
        <div className={s.lastAccessAt}>
          Last Access: {lastAccessAt ? moment(lastAccessAt).format('lll') : '-'}
        </div>
        <div className={s.description}>{description}</div>
        <div className={s.actions}>
          <IconButton containerElement={<Link to={`/edit/${id}`} />}>
            <Edit color="#666" />
          </IconButton>
          <DeleteBookmark bookmark={this.props}>
            <Delete color="#666" />
          </DeleteBookmark>
        </div>
      </div>
    );
  }

  render() {
    const { name, url } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <a
            className={s.link}
            href={url}
            onTouchTap={this.handleLink}
            onClick={event => event.preventDefault()}
          >
            <span>{name}</span>
            <span className={s.url}>{url}</span>
          </a>
          {this.renderExpanded()}
        </div>
        <div>
          {this.state.open ?
            <IconButton onTouchTap={this.handleClose}><ExpandLess /></IconButton> :
            <IconButton onTouchTap={this.handleOpen}><ExpandMore /></IconButton>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(s)(BookmarkListItem);
