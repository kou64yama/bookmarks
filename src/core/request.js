import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import createError from 'http-errors';

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

  async send(body) {
    const url = this.params ?
      `${this.url}?${queryString.stringify(this.params)}` : this.url;
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
