import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";


const useRepackstore = create((set, get) => ({
  upload: async (file) => {
    try {
      const formData = new FormData();
      formData.append('shapeImage', file); // 'shapeImage' should match the backend expectation

      const res = await axiosInstance.post("/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data)
      toast.success("Image file submitted successfully");
      return res.data; // Return the response data if needed
    } catch (error) {
      console.log("Error in repack store", error);
      toast.error("Internal server error");
      throw error;
    }
  }
}));

export default useRepackstore;