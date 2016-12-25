import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import BookmarkIcon from 'material-ui/svg-icons/action/bookmark';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Toolbar, ToolbarGroup, TextField } from '../../components/Toolbar';
import Link from '../../components/Link';

const Home = () => (
  <div>
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

export default Home;
