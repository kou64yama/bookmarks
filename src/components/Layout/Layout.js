import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Alert from '../../containers/Alert';
import Confirm from '../../containers/Confirm';
import Prompt from '../../containers/Prompt';

const Layout = ({ children, noHeader = false }) => (
  <div>
    {!noHeader && <Header />}
    {children}
    <Alert />
    <Confirm />
    <Prompt />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  noHeader: PropTypes.bool,
};

export default withStyles(s)(Layout);
