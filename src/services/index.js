/* eslint-disable import/prefer-default-export */

import Service from './Service';

const models = process.env.BROWSER ? {} : require('../data/models');

export const userService = new Service('/users', models.Users);
export const bookmarkService = new Service('/bookmarks', models.Bookmark);
