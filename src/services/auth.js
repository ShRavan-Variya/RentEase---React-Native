import { API } from "../api";


export async function login(data) {
  const res = await API.post('login', data);
  return res;
}

export async function register(data) {
  const res = await API.post('add_user_data', data);
  return res;
}

export async function property(data) {
  const res = await API.post('add_property_data', data);
  return res;
}