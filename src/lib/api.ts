
import axios from "axios";

// Use VITE_API_URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// ===================== //
// 🔹 Auth functions
// ===================== //
export const loginAdmin = async (credentials: { username: string; password: string }) => {
  const res = await api.post("/admin/login", credentials);
  return res.data;
};

// User Auth
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

// ===================== //
// 🔹 Songs CRUD functions
// ===================== //

// Get all songs
export const getSongs = async () => {
  const res = await api.get("/songs");
  return res.data;
};

// Add new song
export const addSong = async (songData: { title: string; lang: string; link: string }) => {
  const res = await api.post("/songs", songData);
  return res.data;
};

// Update song by ID
export const updateSong = async (
  id: string,
  songData: { title?: string; lang?: string; link?: string }
) => {
  const res = await api.put(`/songs/${id}`, songData);
  return res.data;
};

// Delete song by ID
export const deleteSong = async (id: string) => {
  const res = await api.delete(`/songs/${id}`);
  return res.data;
};

// ===================== //
// 🔹 Albums CRUD functions
// ===================== //

// Get all albums
export const getAlbums = async () => {
  const res = await api.get("/albums");
  return res.data;
};

// Add new album (Admin only)
export const addAlbum = async (albumData: { 
  title: string; 
  description: string; 
  duration: string; 
  price: number; 
  image: string; 
  driveFileId: string 
}) => {
  const res = await api.post("/albums", albumData);
  return res.data;
};

// Update album by ID (Admin only)
export const updateAlbum = async (
  id: string,
  albumData: { 
    title?: string; 
    description?: string; 
    duration?: string; 
    price?: number; 
    image?: string; 
    driveFileId?: string 
  }
) => {
  const res = await api.put(`/albums/${id}`, albumData);
  return res.data;
};

// Delete album by ID (Admin only)
export const deleteAlbum = async (id: string) => {
  const res = await api.delete(`/albums/${id}`);
  return res.data;
};

// ===================== //
// 🔹 Orders functions
// ===================== //

// Create PayPal order
export const createOrder = async (albumId: string) => {
  const res = await api.post("/orders/create", { albumId });
  return res.data;
};

// Capture PayPal order
export const captureOrder = async (paypalOrderId: string) => {
  const res = await api.post("/orders/capture", { paypalOrderId });
  return res.data;
};

// Get user's orders
export const getMyOrders = async () => {
  const res = await api.get("/orders/mine");
  return res.data;
};

// Download album
export const downloadAlbum = async (albumId: string) => {
  const res = await api.get(`/download/${albumId}`);
  return res.data;
};


