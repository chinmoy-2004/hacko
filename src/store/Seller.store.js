import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

import useEcosense from "./ecosense.store.js";




const useSellerStore = create((set, get) => ({
    products: [],

    fetchProducts: async () => {
        try {
            const response = await axiosInstance.get('/get_all_product');
            console.log("Fetched products:", response.data);
            set({ products: response.data.slice(0, 10) });
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch products");
        }
    },
    downloadcertificate: async (ectId) => {
        try {

            const { seller_name } = useEcosense.getState();

            const product = await axiosInstance.get(`blockchain/product/${ectId}`);
            console.log("Product details:", product.data);

            const {
                product_name,
                product_id,
                block_hash,
                ect_id
            } = product.data;

            const formDataObj = new FormData();
            formDataObj.append('seller_name', seller_name); //Replace from ecosense seller store 
            formDataObj.append('product_name', product_name);
            formDataObj.append('product_id', product_id);
            formDataObj.append('ect_no', ect_id);
            formDataObj.append('hash_no', block_hash);

            const res = await axiosInstance.post("/certificate/generate_product", formDataObj, {
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
            console.error("Error in certificate generation:", error);
            toast.error(error.response?.data?.message || "Failed to generate certificate");
            return false;
        }
    }
}));

export default useSellerStore;