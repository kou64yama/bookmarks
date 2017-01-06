import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import { bookmarkService } from '../../services';
import { receiveBookmarks } from '../../actions/bookmarks';

export default {

  path: '/',

  async action({ store }) {
    const bookmarks = await bookmarkService.findAll();
    store.dispatch(receiveBookmarks(bookmarks));

    return {
      title: 'Bookmarks',
      component: <Layout><Home /></Layout>,
    };
  },

};
