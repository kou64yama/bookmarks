/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import rimraf from 'rimraf';

export const cleanDir = (pattern, options) => new Promise((resolve, reject) =>
  rimraf(pattern, { glob: options }, (err, result) => (err ? reject(err) : resolve(result))),
);
