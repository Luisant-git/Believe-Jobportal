import axiosServices from "@/utils/axios";

export async function getAdmin(id) {
  const response = await axiosServices.get(`auth/admins/me`);
  return response
    ? { ...response.data, success: response.status === 200 }
    : null;
}