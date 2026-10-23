import axiosServices from "@/utils/axios";

const endpoints = {
  key: "posters",
};

export async function createPoster(data) {
  try {
    const response = await axiosServices.post(`${endpoints.key}`, data);
    return {
      ...response.data,
      success: response.status === 200 || response.status === 201,
    };
  } catch (error) {
    console.error("Error creating poster:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create poster",
    };
  }
}

export async function getPosters() {
  const response = await axiosServices.get(`${endpoints.key}`);
  return response;
}

export async function getActivePoster() {
    const response = await axiosServices.get(`${endpoints.key}/active`);
    return response;
}

export async function updatePoster(id, data) {
  const response = await axiosServices.patch(`${endpoints.key}/${id}`, data);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function deletePoster(id) {
  const response = await axiosServices.delete(`${endpoints.key}/${id}`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function updatePosterToggleActive(id, data) {
  const response = await axiosServices.patch(
    `${endpoints.key}/${id}/toggle-active`,
    data
  );
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function getPosterById(id) {
  const response = await axiosServices.get(`${endpoints.key}/${id}`);
  return response;
}
