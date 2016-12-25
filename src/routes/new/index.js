import React from 'react';
import New from './New';
import Layout from '../../components/Layout';

export default {

  path: '/new',

  action() {
    return {
      title: 'New Bookmark',
      component: <Layout><New /></Layout>,
    };
  },

};
