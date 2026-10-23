export async function getEmployerDashboardCounts(userId) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/dashboard/employer/${userId}`;
    console.log("Making API call to:", url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching employer dashboard counts:", error);
    throw error;
  }
}