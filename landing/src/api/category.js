import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const endpoints = {
  key: "job-categories",
};

export async function getCategories(query) {
  const response = await axiosServices.get(
    `${endpoints.key}${ObjToQueryString(query)}`  
  );
  return response;
}

export async function postCategoryAdmin(data) {
  try {
    const response = await axiosServices.post(`/job-categories`, data);
    return {
      ...response.data,
      success: response.status === 200 || response.status === 201  
    };
  } catch (error) {
    console.error("Error posting category:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create category"
    };
  }
}

export async function postCategory(userId, data) {
  try {
    const response = await axiosServices.post(`/job-categories/${userId}`, data); // Changed 'date' to 'data'
    return {
      ...response.data,
      success: response.status === 200 || response.status === 201  
    };
  } catch (error) {
    console.error("Error posting category:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create category"
    };
  }
}

export async function getCategoryById(id) {
  const response = await axiosServices.get(`${endpoints.key}/${id}`);
  return response;
}
export async function updateCategory(id, data) {
  const response = await axiosServices.put(`${endpoints.key}/${id}`, data);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function deleteCategory(id) {
  const response = await axiosServices.delete(`${endpoints.key}/${id}`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function lookupCategoryAdmin() {
  const response = await axiosServices.get(`/job-categories`);
  return response;
}

export async function lookupCategory(userId) {
  const response = await axiosServices.get(`/job-categories/user/${userId}`);
  return response;
}

export async function softdeleteCategory(id) {
  const response = await axiosServices.delete(
    `${endpoints.key}/${id}/soft-delete`
  );
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}
export async function restoreCategory(id) {
  const response = await axiosServices.put(`${endpoints.key}/${id}/restore`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}
