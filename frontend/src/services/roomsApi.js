import axiosClient from "../config/axios";

export async function createRoom(formData) {
  try {
    const response = await axiosClient.post("/create-room", formData);
    const { data, error } = response.data;
    if (error) {
      throw new Error("Error creating Room");
    }
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error creating room");
  }
}

// createRoom({ name: "ad", password: "pass", xpiration: 3600 });

export async function loginToRoom(formData) {
  try {
    const response = await axiosClient.post("/room-login", formData);
    const { data, error } = response.data;
    if (error) {
      throw new Error("Error loging in f");
    }
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error loging in f");
  }
}

// loginToRoom({ roomName: "ameba", password: "ameba1" });
