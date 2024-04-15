import { API } from "../api";


export async function login(data) {
  const res = await API.post('login', data);
  return res.data;
}

export async function register(data) {
  const res = await API.post('add_user_data', data);
  return res.data;
}

export async function property(data) {
  const res = await API.post('add_property_data', data);
  return res.data;
}

export async function uploadImages(_config, data) {
  const res = await API.post('upload', data, _config);
  return res.data;
}

export async function getPropertyList(){
  const res = await API.get('get_user_property');
  return res.data;
}


