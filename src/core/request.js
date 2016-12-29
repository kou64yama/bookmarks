import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import createError from 'http-errors';
import { host } from '../config';

class RequestBuilder {
  constructor({ responseHandlers = [] } = {}) {
    this.responseHandlers = responseHandlers;
    this.headers = {};
  }

  init(method, url, params) {
    this.method = method;
    this.url = url;
    this.params = params;
    return this;
  }

  set(key, value) {
    this.headers[key] = value;
    return this;
  }

  localUrl() {
    if (process.env.BROWSER) {
      return this.url;
    }

    if (this.url.startsWith('//')) {
      return `https:${this.url}`;
    }
    if (this.url.startsWith('/')) {
      return `http://${host}${this.url}`;
    }

    return this.url;
  }

  async send(body) {
    const url = this.params ?
      `${this.localUrl()}?${queryString.stringify(this.params)}` : this.localUrl();
    const headers = {
      ...this.headers,
      Accept: 'application/json',
      ...body ? { 'Content-Type': 'application/json' } : {},
    };

    const response = await fetch(url, {
      method: this.method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse(response);
  }

  async handleResponse(response) {
    const contentType = response.headers.get('Content-Type');
    const handler = this.responseHandlers
      .find(({ acceptable }) => acceptable.test(contentType));
    const body = handler ? await handler.handle(response) : undefined;

    if (!response.ok) {
      throw createError(response.status, body.message || response.statusText, {
        ...body || {},
      });
    }

    return body || response.body;
  }
}

const responseHandlers = Object.entries({
  'application/json': response => response.json(),
}).map(([type, handle]) => ({
  acceptable: new RegExp(`^${type}(;|$)`, 'i'),
  handle,
}));

export default {
  get: (url, params) => new RequestBuilder({ responseHandlers }).init('get', url, params),
  post: (url, params) => new RequestBuilder({ responseHandlers }).init('post', url, params),
  put: (url, params) => new RequestBuilder({ responseHandlers }).init('put', url, params),
  del: (url, params) => new RequestBuilder({ responseHandlers }).init('delete', url, params),
};
