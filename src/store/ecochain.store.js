import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

const useEcochainStore = create((set, get) => ({
//   productname: "",
//   productid: "",
//   carbonkg: NaN,
//   issuedate: "",
//   certyfyingbody: "",
//   manufacturer: "",
//   materials: "",
//   category: "",

  submitdata: async (formData) => {
    try {
      console.log("Submitting data:", formData);
      const response = await axiosInstance.post('/submit', formData);
      console.log("Response from server:", response.data);
      if (response.status === 200) {
        toast.success("Data submitted successfully!");
      } else {
        toast.error("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred while submitting data.");
    }
  },

  verifyect: async (ectid) => {
    try {
      console.log("Verifying ECT ID:", ectid);
      const response = await axiosInstance.get('/verify', {
        params: { ect_id: ectid }
      });

      if (response.status === 200) {
        // const {
        //   product_name,
        //   product_id,
        //   carbon_kg,
        //   issued_at,
        //   certifying_body,
        //   manufacturer,
        //   materials,
        //   category
        // } = response.data;

        // // Set Zustand state
        // set({
        //   productname: product_name,
        //   productid: product_id,
        //   carbonkg: carbon_kg,
        //   issuedate: issued_at,
        //   certyfyingbody: certifying_body,
        //   manufacturer,
        //   materials,
        //   category
        // });

        toast.success("ECT ID verified successfully!");
        return response.data; // ✅ Return the data for external use
      } else {
        toast.error("Failed to verify ECT ID.");
        return null;
      }
    } catch (error) {
      console.error("Error verifying ECT ID:", error);
      toast.error("An error occurred while verifying ECT ID.");
      return null;
    }
  }
}));

export default useEcochainStore;
