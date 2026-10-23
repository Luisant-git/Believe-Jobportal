import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const endpoints = {
  key: "Jobs",
};

export async function getJobs(quary) {
  const response = await axiosServices.get(
    `${endpoints.key}/${ObjToQueryString(quary)}`
  );
  return response;
}

export async function postJobByEmployer(userId, data) {
  console.log(" Calling postJobByEmployer API with:", data);

  try {
    const response = await axiosServices.post(`/jobs/user/${userId}`, data);
    console.log(" API Response:", response);
    return {
      ...response.data,
      success: [200, 201].includes(response.status),
    };
  } catch (error) {
    console.error(" API Error in postJobByEmployer:", error);
    throw error;
  }
}

export async function postJob(data) {
  const response = await axiosServices.post("Jobs", data);
  return response
    ? { ...response.data, success: [200, 201].includes(response.status) }
    : null;
}

export async function getJobById(id) {
  const response = await axiosServices.get(`${endpoints.key}/data/${id}`);
  return response;
}

export async function deleteJob(id) {
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

export async function getFilter(quary) {
  const response = await axiosServices.get(
    `${endpoints.key}/search/${ObjToQueryString(quary)}`
  );
  return response;
}

export async function getAllSkills() {
  const response = await axiosServices.get(`${endpoints.key}/skills/all`);
  return response;
}
export async function getAllLocations() {
  const response = await axiosServices.get(`${endpoints.key}/locations`);
  return response;
}

export async function getLookup() {
  const response = await axiosServices.get(`${endpoints.key}/lookup`);
  return response;
}

export async function getAllJobs() {
  const response = await axiosServices.get(`${endpoints.key}/titles`);
  return response;
}

export async function getAllJobsForJobPosters() {
  const response = await axiosServices.get(`${endpoints.key}`);
  return response;
}

export async function updateJobsToggleActive(id) {
  const response = await axiosServices.patch(
    `${endpoints.key}/${id}/toggle-active`
  );
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function getActiveJobs() {
    const response = await axiosServices.get(`${endpoints.key}/active`);
    return response;
}
