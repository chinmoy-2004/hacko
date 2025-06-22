import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";



const useRecommendStore = create((set, get) => ({

   isrecommendationsLoading: false,
   personalized: [],
   trending: [],
   all_products: [],
   search_results: [],
   isgetprodut:false,


   getrecommendations: async () => {
      try {
         set({ isrecommendationsLoading: true });
         const res = await axiosInstance.get("/recommend");
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
   },

   getproduct:async(query)=>{
      try {
         set({ isgetprodut: true });
         const form=new FormData();
         form.append("search", query);
         const res=await axiosInstance.post("/recommend", form);
         set({ search_results: res.data.search_results });
         console.log("Search results:", res.data.search_results);
         return res.data;
      } catch (error) {
         console.log("Error in getproduct", error);
         toast.error("Internal server error");
      }finally{
         set({ isgetprodut: false });
      }
   }
}));

export default useRecommendStore;