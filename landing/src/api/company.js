import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const endpoints = {
  key: "company-details",
};

export async function getCompanyDetails(query) {
  const response = await axiosServices.get(
    `${endpoints.key}${ObjToQueryString(query)}`
  );
  return response;
}

export async function getCompanyDetailsById(id) {
  const response = await axiosServices.get(`${endpoints.key}/data/${id}`);
  return response;
}

export async function createCompanyDetails(data) {
  const response = await axiosServices.post(endpoints.key, data);
  return response
    ? { ...response.data, success: response.status === 200 }
    : null;
}

export async function updateCompanyDetails(id, data) {
  const response = await axiosServices.patch(`${endpoints.key}/${id}`, data);
  return response
    ? { ...response.data, success: response.status === 200 }
    : null;
}

export async function deleteCompanyDetails(id, deletedBy = 1) {
  const response = await axiosServices.delete(`${endpoints.key}/${id}?deletedBy=${deletedBy}`);
  return response
    ? { ...response.data, success: response.status === 200 }
    : null;
}

export async function getLookUpCompany() {
  const response = await axiosServices.get(`${endpoints.key}/lookup`);
  return response;
}
