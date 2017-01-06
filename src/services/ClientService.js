import request from '../core/request';

const BASE_URL = '/rest';

export default class ClientService {
  constructor(baseUrl) {
    // remove last slashes.
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  findAll(where) {
    return request.get(`${BASE_URL}${this.baseUrl}`, where).send();
  }

  create(body) {
    return request.post(`${BASE_URL}${this.baseUrl}`).send(body);
  }

  findOne(id) {
    return request.get(`${BASE_URL}${this.baseUrl}/${id}`).send();
  }

  update(id, body) {
    return request.put(`${BASE_URL}${this.baseUrl}/${id}`).send(body);
  }

  delete(id) {
    return request.delete(`${BASE_URL}${this.baseUrl}/${id}`).send();
  }
}
