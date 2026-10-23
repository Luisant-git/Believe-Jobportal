import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const endpoints = {
  key: "subscriptions"
};

export async function getSubscriptions(query = {}) {
  // Remove pagination parameters from query
  const { page, limit, ...rest } = query;
  const filteredQuery = rest;
  
  const response = await axiosServices.get(
    `${endpoints.key}${ObjToQueryString(filteredQuery)}`
  );
  return response
    ? { 
        data: response.data, // Return data directly without pagination wrapper
        success: [200, 201].includes(response.status) 
      }
    : null;
}

export async function updateSubscription(id, data) {
  const response = await axiosServices.put(
    `${endpoints.key}/${id}`,
    data
  );
  return response
    ? { 
        data: response.data,
        success: [200, 201, 204].includes(response.status) 
      }
    : null;
}

export async function deleteSubscription(id) {
  const response = await axiosServices.delete(
    `${endpoints.key}/${id}`
  );
  return response
    ? { 
        data: response.data,
        success: [200, 204].includes(response.status) 
      }
    : null;
}

export async function getSubscriptionById(id) {
  const response = await axiosServices.get(
    `${endpoints.key}/${id}`
  );
  return response
    ? { 
        data: response.data,
        success: response.status === 200 
      }
    : null;
}

export async function createSubscription(data) {
  try {
    const response = await axiosServices.post(
      endpoints.key,
      data
    );
    return {
      data: response.data,
      success: [200, 201].includes(response.status),
    };
  } catch (error) {
    console.error("API Error in createSubscription:", error);
    throw error;
  }
}