import axiosClient from "../config/axios";

export async function getMessages(room) {
  // console.log(`get-messages/${room}`);

  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token not found");
    const response = await axiosClient.get(`get-messages/${room}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status !== 200) {
      throw new Error("Error fetching messages");
    }
    // console.log("RESPONSE", response);
    return response.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
