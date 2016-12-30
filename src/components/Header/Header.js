import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import BookmarkIcon from 'material-ui/svg-icons/action/bookmark-border';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import s from './Header.css';
import { Toolbar, ToolbarGroup, TextField } from '../Toolbar';
import Link from '../Link';

const Header = () => (
  <div className={s.root}>
    <Toolbar>
      <ToolbarGroup fullWidth>
        <TextField />
      </ToolbarGroup>
      <ToolbarGroup>
        <IconButton containerElement={<Link to="/new" />}>
          <BookmarkIcon />
        </IconButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="My Profile" containerElement={<Link to="/profile" />} />
          <Divider />
          <MenuItem primaryText="Help" containerElement={<Link to="/help" />} />
          <MenuItem primaryText="Sign Out" />
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>
  </div>
);

Header.propTypes = {
};

export default withStyles(s)(Header);
