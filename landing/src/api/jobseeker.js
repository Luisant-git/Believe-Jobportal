import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const createendpoints = {
  key: "auth/register/job-seeker",
  app: "applications",
  registerContainer: "auth/register-job-seeker",
};

const endpoints = {
  key: "users/jobseekers",
};

export async function createJobSeekerApi(data) {
  try {
    const response = await axiosServices.post(`${createendpoints.key}`, data);
    return {
      ...response.data,
      success: response.status === 200 || response.status === 201,
    };
  } catch (error) {
    console.error("Error creating job seeker:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create job seeker",
    };
  }
}

export async function createJobSeekerWithoutPasswordApi(data) {
  try {
    const response = await axiosServices.post(`${createendpoints.registerContainer}`, data);
    return {
      ...response.data,
      success: response.status === 200 || response.status === 201,
    };
  } catch (error) {
    console.error("Error creating job seeker:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create job seeker",
    };
  }
}

export async function getJobSeekerApi(params = {}) {
  const response = await axiosServices.get(endpoints.key, {
    params: {
      ...params,
    },
  });
  return response;
}


export async function getJobSeekerByIdApi(id) {
  const response = await axiosServices.get(`users/data/job-seeker/${id}`);
  return response;
}

export async function updateJobSeekerApi(id, data) {
  const response = await axiosServices.patch(`users/${id}/jobseeker`, data);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function updateStatusApi(id, data) {
  const response = await axiosServices.patch(`users/${id}/status`, data);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function deleteJobSeekerApi(id) {
  const response = await axiosServices.delete(`jobseekers/${id}`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function softDeleteJobSeekerApi(id) {
  const response = await axiosServices.delete(`jobseekers/${id}`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function getJobSeekerLookUp() {
  const response = await axiosServices.get(`${endpoints.key}/details`);
  return response;
}
