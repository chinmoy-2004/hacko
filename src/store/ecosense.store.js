import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";


const useEcosense=create((set, get) => ({

issellerverify:true,

verifyseller:async (formData) => {
    try {
        console.log("Verifying seller:", formData);
        const response = await axiosInstance.post('/verify-seller', formData);
        console.log("Response from server:", response.data);
        toast.success("Seller verified successfully!");
        set({ isselleerverify: true });
        return response.data; // ✅ Return the data for external use
    } catch (error) {
        console.error("Error verifying seller:", error);
        toast.error("An error occurred while verifying seller.");
    }
}

}));


export default useEcosense; 