import axiosServices from "@/utils/axios";

const endpoints = {
  key: "uploads",
};

export async function Upload(file) {
  const formData = new FormData();
  formData.append("files", file);
  
  try {
    const response = await axiosServices.post(
      endpoints.key, 
      formData,     
      {            
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}