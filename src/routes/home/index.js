import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import { bookmarkService } from '../../services';
import { receiveBookmarks } from '../../actions/bookmarks';

export default {

  path: '/',

  async action({ store, query, user }) {
    const bookmarks = await bookmarkService.findAll(query, user);
    store.dispatch(receiveBookmarks(bookmarks));

    return {
      title: 'Bookmarks',
      component: <Layout><Home /></Layout>,
    };
  },

};
