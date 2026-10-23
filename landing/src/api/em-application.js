import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const endpoints = {
  key: "applications",
  employerApplications: (userId) => `/applications/employers/${userId}/applications`
};

// Get applications for a specific employer
export async function getEmployerApplications(userId, query = {}) {
  try {
    const response = await axiosServices.get(
      `${endpoints.employerApplications(userId)}${ObjToQueryString(query)}`
    );
    return {
      data: response.data,
      success: response.status === 200
    };
  } catch (error) {
    console.error("Error fetching employer applications:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch employer applications"
    };
  }
}

// Keep all your existing functions (they might be used for other endpoints)
export async function getApplications(query) {
  const response = await axiosServices.get(
    `${endpoints.key}${ObjToQueryString(query)}`  
  );
  return response;
}

export async function postApplication(data) {
  try {
    const response = await axiosServices.post(`${endpoints.key}`, data);
    return {
      ...response.data,
      success: response.status === 200 || response.status === 201  
    };
  } catch (error) {
    console.error("Error posting application:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create application"
    };
  }
}

export async function getApplicationById(id) {
  const response = await axiosServices.get(`${endpoints.key}/${id}`);
  return response;
}

export async function updateApplication(id, data) {
  const response = await axiosServices.patch(`${endpoints.key}/${id}`, data);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function updateApplicationStatus(id, data) {
  try {
    const response = await axiosServices.patch(
      `${endpoints.key}/${id}/status`, 
      data
    );
    return {
      ...response.data,
      success: response.status === 200
    };
  } catch (error) {
    console.error("Error updating application status:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update application status"
    };
  }
}

export async function deleteApplication(id) {
  const response = await axiosServices.delete(`${endpoints.key}/${id}`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

// Optional additional endpoints if your API supports them
export async function lookupApplications() {
  const response = await axiosServices.get(`${endpoints.key}/data/lookup`);
  return response;
}

export async function softDeleteApplication(id) {
  const response = await axiosServices.delete(
    `${endpoints.key}/${id}/soft-delete`
  );
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function restoreApplication(id) {
  const response = await axiosServices.put(`${endpoints.key}/${id}/restore`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}