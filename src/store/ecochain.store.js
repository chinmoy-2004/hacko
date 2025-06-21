import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

import useSellerStore from "./Seller.store.js";


const { fetchProducts } = useSellerStore();

const useEcochainStore = create((set, get) => ({
  product_name: "",
  product_id: "",
  carbon_kg: "",
  issued_at: "",
  certifying_body: "",
  manufacturer: "",
  materials: "",
  category: "",
  block_hash: "",
  products: [],
  ect_id: "",
  grade: "",


  isproductverified: false,




  submitdata: async (formData) => {
    try {
      console.log("Submitting data:", formData);
      const response = await axiosInstance.post('/blockchain/submit', formData);
      console.log("Response from server:", response.data);
      toast.success("Data submitted successfully!");
      const {
        product_name,
        product_id,
        block_hash,
        ect_id
      } = response.data[0];

      // seller_name, product_name, product_id, ect_no, hash_no
      set({ ect_id: ect_id });

      fetchProducts(); // Fetch products after submission

      // get().getCertificate(formDataObj);

      set({ isproductverified: true }); // Set the verification status to true

      console.log(response.data)
      // set({ products: response.data.slice(0, 10) }); // Store the products in Zustand state
      // return response.data; // ✅ Return the data for external use

    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred while submitting data.");
    }
  },

  verifyect: async (ectid) => {
    try {
      console.log("Verifying ECT ID:", ectid);
      const response = await axiosInstance.get('/blockchain/verify', {
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
          console.log(response.data);
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
  },

  getCertificate: async (formdata) => {
    try {
      const res = await axiosInstance.post("/certificate/generate_product", formdata, {
        responseType: 'blob', // Important for file downloads
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Create a download link for the PDF
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'product_certificate.pdf');
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Certificate downloaded successfully!");
      return true;
    } catch (error) {
      console.log("Error in certificate generation:", error);
      toast.error(error.response?.data?.message || "Failed to generate certificate");
      return false;
    }
  },

  addproduct: async (formData) => {
    try {
      console.log("Adding product:", formData);
      const response = await axiosInstance.post('/recommend/add_product', formData);
      console.log("Response from server:", response.data);
      if (response.data.status == "success") {
        toast.success("Product added successfully!");
      }
      else toast.error("Failed to add product.");
      set({ isproductverified: false })

    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred while adding the product.");
    }
  },

  getgrading: async (formData) => {
    try {
      const res = await axiosInstance.post('/grading', formData);
      console.log("Response from grading:", res.data.grade);
      set({ grade: res.data.grade });
    } catch (error) {
      console.log("Error in grading:", error);
      toast.error("An error occurred while fetching the grade.");
    }
  }

}));

export default useEcochainStore;
