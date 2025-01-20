import axiosClient from '../config/axios';

// GETS all room messages requires JWT token
export async function getMessages(room) {
  // console.log(`get-messages/${room}`);

  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Token not found');
    const response = await axiosClient.get(`get-messages/${room}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status !== 200) {
      throw new Error('Error fetching messages');
    }
    // console.log("RESPONSE", response);
    return response.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
// DELETES all room messages requires JWT token
export async function deleteMessages(room) {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Token not found');

    const response = await axiosClient.delete(`delete-messages/${room}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) throw new Error('Error deleting messages');

    return response.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
