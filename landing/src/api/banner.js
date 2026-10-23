import axiosServices from "@/utils/axios";

const endpoints = {
  key: "banners",
};

export async function createBanner(data) {
  try {
    const response = await axiosServices.post(`${endpoints.key}`, data);
    return {
      ...response.data,
      success: response.status === 200 || response.status === 201,
    };
  } catch (error) {
    console.error("Error creating Banner:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create Banner",
    };
  }
}

export async function getBanner() {
  const response = await axiosServices.get(`${endpoints.key}`);
  return response;
}

export async function getActiveBanner() {
    const response = await axiosServices.get(`${endpoints.key}/active`);
    return response;
}

export async function updateBanner(id, data) {
  const response = await axiosServices.patch(`${endpoints.key}/${id}`, data);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function deleteBanner(id) {
  const response = await axiosServices.delete(`${endpoints.key}/${id}`);
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function updateBannerToggleActive(id, data) {
  const response = await axiosServices.patch(
    `${endpoints.key}/${id}/toggle-active`,
    data
  );
  return response
    ? { ...response.data, success: response.status == 200 }
    : null;
}

export async function getBannerById(id) {
  const response = await axiosServices.get(`${endpoints.key}/${id}`);
  return response;
}
