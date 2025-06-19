import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";


const useCarbonKarmaStore = create((set, get) => ({

    isemmissionchecked: false,
    

    CheckEmmission: async(formdata)=>{
        try {
             set({isemmissionchecked: true});
            const res= await axiosInstance.post('/carbon/estimate', formdata);
           
            console.log("Emission check response:", res.data);
            toast.success("Emission checked successfully!");
            return res.data; // ✅ Return the data for external use
        } catch (error) {
            console.error("Error checking emission:", error);
            toast.error("An error occurred while checking emission.");
            
        }
        finally {
            set({isemmissionchecked: false});
        }
    }
}));

export default useCarbonKarmaStore;