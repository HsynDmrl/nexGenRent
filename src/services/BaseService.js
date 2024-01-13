import axiosInstance from "../utils/axiosInterceptors";

export default class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll() {
    return axiosInstance.get(this.endpoint + "/getAll");
  }

  getById(id) {
    return axiosInstance.get(`${this.endpoint}/${id}`);
  }

  add(data) {
    return axiosInstance.post(this.endpoint + "/add", data);
  }

  update(data) {
    return axiosInstance.put(`${this.endpoint}/update`, data);
  }

  delete(id) {
    return axiosInstance.delete(`${this.endpoint}/${id}`);
  }
}
