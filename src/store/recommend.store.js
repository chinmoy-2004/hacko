import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";



const useRecommendStore = create((set, get) => ({

    isrecommendationsLoading: false,
     personalized: [],
    trending: [],
    all_products: [],

   getrecommendations: async()=>{
     try {
        set({ isrecommendationsLoading: true });
        const res=await axiosInstance.get("/recommend");  
        set({
            personalized: res.data.personalized,
            trending: res.data.trending,
            all_products: res.data.all_products
         });   
        return res.data;
     } catch (error) {
        console.log("Error in recommend store", error);
        toast.error("Internal server error");
     }
     finally {
            set({ isrecommendationsLoading: false });
    }
   }
}));

export default useRecommendStore;