import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const endpoints = {
  key: "job-categories", 
};


export async function createJobCategory(userId, data) {
  try {
    const response = await axiosServices.post(
      `/${endpoints.key}/${userId}`,
      data
    );
    return {
      ...response.data,
      success: response.status === 200 || response.status === 201
    };
  } catch (error) {
    console.error("Error creating job category:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create job category",
      status: error.response?.status
    };
  }
}


export async function getJobCategoriesByUser(userId, query = {}) {
  try {
    const response = await axiosServices.get(
      `/${endpoints.key}/user/${userId}${ObjToQueryString(query)}`
    );
    return {
      data: response.data,
      meta: response.meta,
      success: true
    };
  } catch (error) {
    console.error("Error fetching job categories:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch categories",
      status: error.response?.status
    };
  }
}


export async function updateJobCategory(id, userId, data) {
  try {
    const response = await axiosServices.patch(
      `/${endpoints.key}/${id}/${userId}`,
      data
    );
    return {
      ...response.data,
      success: response.status === 200
    };
  } catch (error) {
    console.error("Error updating job category:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update category",
      status: error.response?.status
    };
  }
}


export async function deleteJobCategory(id, userId) {
  try {
    const response = await axiosServices.delete(
      `/${endpoints.key}/${id}/${userId}`
    );
    return {
      ...response.data,
      success: response.status === 200
    };
  } catch (error) {
    console.error("Error deleting job category:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete category",
      status: error.response?.status
    };
  }
}


export async function getJobCategoryById(id, userId) {
  try {
    const response = await axiosServices.get(
      `/${endpoints.key}/${id}/${userId}`
    );
    return {
      data: response.data,
      success: true
    };
  } catch (error) {
    console.error("Error fetching job category:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch category",
      status: error.response?.status
    };
  }
}

export default {
  createJobCategory,
  getJobCategoriesByUser,
  updateJobCategory,
  deleteJobCategory,
  getJobCategoryById
};