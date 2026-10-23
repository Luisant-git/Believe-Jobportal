import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const endpoints = {
  key: "applications",
};

export async function getApplication(quary) {
  const response = await axiosServices.get(
    `${endpoints.key}/${ObjToQueryString(quary)}`
  );
  return response;
}

export async function posApplication(userId, data) {
  const response = await axiosServices.post(`${endpoints.key}/${userId}`, data);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function getApplicationById(id) {
  const response = await axiosServices.get(`${endpoints.key}/data/${id}`);
  return response;
}

export async function deleteApplication(id) {
  const response = await axiosServices.delete(`${endpoints.key}/delete/${id}`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}
export async function updateJob(id, data) {
  const response = await axiosServices.patch(
    `${endpoints.key}/update/${id}`,
    data
  );
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}
