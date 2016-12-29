import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import request from '../../core/request';
import { receiveBookmarks } from '../../actions/bookmarks';

export default {

  path: '/',

  async action({ store }) {
    const bookmarks = await request.get('/rest/bookmarks').send();
    store.dispatch(receiveBookmarks(bookmarks));

    return {
      title: 'Bookmarks',
      component: <Layout><Home /></Layout>,
    };
  },

};
