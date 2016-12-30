import React from 'react';
import Edit from './Edit';
import Layout from '../../components/Layout';
import request from '../../core/request';

export default {

  path: '/edit/:id',

  async action({ params }) {
    const { id } = params;
    const bookmark = await request.get(`/rest/bookmarks/${id}`).send();
    if (!bookmark) {
      return undefined;
    }

    return {
      title: 'New Bookmark',
      component: <Layout><Edit id={bookmark.id} defaultValue={bookmark} /></Layout>,
    };
  },

};
