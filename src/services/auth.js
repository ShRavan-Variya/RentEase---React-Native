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

export async function getOwnerPropertyList(userId){
  const res = await API.get(`get_owner_property?owner_id=${userId}`);
  return res.data;
}

export async function getPropertyDetails(id){
  const res = await API.get(`get_property_details?property_id=${id}`);
  return res.data;
}

export async function putPropertyList(id, userId, updatedData){
  const res = await API.get(`edit_property_data?property_id=${id}&owner_id=${userId}`, updatedData);
  return res.data;
}

export async function updateImages(imageList) {
  const res = await API.get(`update_images`, imageList);
  return res.data;
}

