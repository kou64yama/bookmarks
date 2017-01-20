import { join } from 'path';
import Config, { Middleware } from 'nobushi-config/lib/Config';
import ConfigLoader from 'nobushi-config/lib/ConfigLoader';
import applyFilter from 'nobushi-config/lib/applyFilter';
import DefaultMiddleware from 'nobushi-config/lib/middleware/DefaultMiddleware';
import SecureMiddleware from 'nobushi-config/lib/middleware/SecureMiddleware';
import environment from 'nobushi-config/lib/filter/environment';

let middleware: Middleware;
if (process.env.NODE_CONFIG_PRIVATE_KEY) {
  const privateKey = new Buffer(process.env.NODE_CONFIG_PRIVATE_KEY, 'base64');
  middleware = new SecureMiddleware(privateKey.toString('utf8'));
} else {
  middleware = new DefaultMiddleware();
}

const configDir = process.env.NODE_CONFIG_DIR || join(__dirname, 'config');
const files = ['default', process.env.NODE_ENV].filter(x => x);
const loader = new ConfigLoader(configDir);
const config = Config.generate(
  loader.loadSync(files),
  applyFilter(middleware, [environment(process.env)]),
);

module.exports = config;
