import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const endpoints = {
  key: "users/employers",
  auth: "auth",
  emp: "employers"
};

export async function createEmployer(data) {
  const response = await axiosServices.post(
    `${endpoints.auth}/register/employer`,
    data
  );
  return response
    ? { ...response.data, success: response.status === 200 }
    : null;
}

export async function createEmployerWithoutPassword(data) {
  const response = await axiosServices.post(
    `${endpoints.auth}/register-employer`,
    data
  );
  return response
    ? { ...response.data, success: response.status === 200 }
    : null;
}

export async function getEmployers(params = {}) {
  try {
    const response = await axiosServices.get(endpoints.key, {
      params: {
        ...params,
      },
    });
    
    return {
      ...response.data,
      success: response.status === 200,
    };
  } catch (error) {
    console.error('Error fetching employers:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch employers',
    };
  }
}


export async function getCompany() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/employers/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error in getEmployerJobs:", error);
    throw error;
  }
}

export async function updateEmployer(id, data) {
  const response = await axiosServices.patch(`users/${id}/employer`, data);
  return response
    ? { ...response.data, success: response.status === 200 }
    : null;
}

export async function updateEmployerStatus(id, data) {
  const response = await axiosServices.patch(
    `${endpoints.key}/${id}/status`,
    data
  );
  return response
    ? { ...response.data, success: response.status === 200 }
    : null;
}

export async function deleteEmployer(id) {
  const response = await axiosServices.delete(`employers/${id}`);
  return response
    ? { ...response.data, success: response.status === 200 }
    : null;
}

export async function loookupEmp() {
  const response = await axiosServices.get(`/employers/active`);
  return response;
}

export async function updateEmployersToggleActive(id) {
  const response = await axiosServices.patch(
    `${endpoints.emp}/${id}/toggle-trust`
  );
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function getTrustedEmployers() {
    const response = await axiosServices.get(`${endpoints.emp}/trusted/all`);
    return response;
}