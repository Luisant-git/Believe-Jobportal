import axiosServices from "@/utils/axios";

export async function getDashboardCounts() {
  try {
    const response = await axiosServices.get("/dashboard/counts");
    return {
      data: response.data,
      success: response.status === 200
    };
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || "Failed to fetch dashboard counts"
    };
  }
}