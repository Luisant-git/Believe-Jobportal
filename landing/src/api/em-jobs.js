import axiosServices from "@/utils/axios";
import { ObjToQueryString } from "@/utils/common";

const endpoints = {
  key: "jobs",
};

export async function createJob(userId, data) {
  console.log("Calling createJob API with:", data);
  try {
    const response = await axiosServices.post(`/jobs/user/${userId}`, data);
    console.log("API Response:", response);
    return {
      ...response.data,
      success: [200, 201].includes(response.status),
    };
  } catch (error) {
    console.error("API Error in createJob:", error);
    throw error;
  }
}

export async function updateJob(userId, jobId, data) {
  try {
    const response = await axiosServices.patch(
      `/jobs/employer/user/${userId}/job/${jobId}`,
      data
    );
    return {
      ...response.data,
      success: response.status === 200,
    };
  } catch (error) {
    console.error("API Error in updateJob:", error);
    throw error;
  }
}

export async function deleteJob(userId, jobId) {
  try {
    const response = await axiosServices.delete(
      `/jobs/employer/user/${userId}/job/${jobId}`
    );
    return {
      ...response.data,
      success: response.status === 200,
    };
  } catch (error) {
    console.error("API Error in deleteJob:", error);
    throw error;
  }
}

export async function getEmployerJobs(userId) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs/employerjobs/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error in getEmployerJobs:", error);
    throw error;
  }
}

export async function getEmployerJobsByID(userId, id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs/employerjobs/${userId}/job/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error in getEmployerJobs:", error);
    throw error;
  }
}

// Additional utility functions if needed
// export async function getJobById(id) {
//   try {
//     const response = await axiosServices.get(`${endpoints.key}/data/${id}`);
//     return {
//       ...response.data,
//       success: response.status === 200,
//     };
//   } catch (error) {
//     console.error("API Error in getJobById:", error);
//     throw error;
//   }
// }

// export async function getFilteredJobs(query) {
//   try {
//     const response = await axiosServices.get(
//       `${endpoints.key}/search/${ObjToQueryString(query)}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("API Error in getFilteredJobs:", error);
//     throw error;
//   }
// }

// export async function getAllSkills() {
//   try {
//     const response = await axiosServices.get(`${endpoints.key}/skills/all`);
//     return response.data;
//   } catch (error) {
//     console.error("API Error in getAllSkills:", error);
//     throw error;
//   }
// }

// export async function getAllLocations() {
//   try {
//     const response = await axiosServices.get(`${endpoints.key}/locations`);
//     return response.data;
//   } catch (error) {
//     console.error("API Error in getAllLocations:", error);
//     throw error;
//   }
// }