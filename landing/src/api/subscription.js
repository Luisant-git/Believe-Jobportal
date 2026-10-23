import axiosServices from "@/utils/axios";

const endpoints = {
  key: "subscriptions", 
};

export async function createSubscription(data) {
  try {
    const response = await axiosServices.post(
      `/${endpoints.key}`,
      data
    );
    return {
      ...response.data,
      success: response.status === 200 || response.status === 201
    };
  } catch (error) {
    console.error("Error creating subscription:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create subscription",
      status: error.response?.status
    };
  }
}

export async function getSubscriptionsByUser(id) {
    try {
        const response = await axiosServices.get(`${endpoints.key}/employer/${id}`);
        return {
            data: response.data || [],
            success: response.status === 200
        };
    } catch (error) {
        console.error("Error fetching subscriptions by user:", error);
        return {
            data: [],
            success: false,
            message: error.response?.data?.message || "Failed to fetch subscriptions",
            status: error.response?.status
        };
    }
}

export default {
  createSubscription,
  getSubscriptionsByUser,
};