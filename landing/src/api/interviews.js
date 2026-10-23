import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const endpoints = {
  key: "interviews",
};

export async function getInterviews(query) {
  const response = await axiosServices.get(
    `${endpoints.key}${ObjToQueryString(query)}`  
  );
  return response;
}

export async function postInterview(data) {
  try {
    const response = await axiosServices.post(`${endpoints.key}`, data);
    return {
      ...response.data,
      success: response.status === 200 || response.status === 201  
    };
  } catch (error) {
    console.error("Error creating interview:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create interview"
    };
  }
}

export async function getInterviewById(id) {
  const response = await axiosServices.get(`${endpoints.key}/${id}`);
  return response;
}

export async function updateInterview(id, data) {
  const response = await axiosServices.patch(`${endpoints.key}/${id}`, data);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function deleteInterview(id) {
  const response = await axiosServices.delete(`${endpoints.key}/${id}`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

// Optional additional endpoints if your API supports them
export async function lookupInterviews() {
  const response = await axiosServices.get(`${endpoints.key}/data/lookup`);
  return response;
}

export async function softDeleteInterview(id) {
  const response = await axiosServices.delete(
    `${endpoints.key}/${id}/soft-delete`
  );
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function restoreInterview(id) {
  const response = await axiosServices.put(`${endpoints.key}/${id}/restore`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}