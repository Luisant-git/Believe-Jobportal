import axiosServices from "@/utils/axios";

const endpoints = {
  key: "applications/jobseekers",
  user: "users/data/employer",
  jobseeker: "users/data/job-seeker"
};

export async function getUsersWithJobSeeker(id) {
  const response = await axiosServices.get(`${endpoints.key}/${id}/applications`);
  return response;
}

export async function getEmployerByUserId(id) {
  const response = await axiosServices.get(`${endpoints.user}/${id}`);  
  return response;
}

export async function getUserJobSeekerById(id) {
  const response = await axiosServices.get(`${endpoints.jobseeker}/${id}`);
  return response;
}

