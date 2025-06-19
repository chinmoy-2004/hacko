import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";


const useEcosense = create((set, get) => ({
  seller_name: "",
  issellerverify: false,
  status: "success",
  isverificationprocessing: false,

  sellerVerification: async (formData) => {
  try {
    set({isverificationprocessing: true});
    const sellerName = formData.get('name') || "X"; // Get name directly from the incoming formData
    set({ seller_name: sellerName });
   
    console.log("Verifying seller:", formData);
    const response = await axiosInstance.post('/seller/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    const { seller_id } = response.data;

    // Create new FormData for certificate generation
    const certificateFormData = new FormData();
    certificateFormData.append('seller_name', sellerName); // Use the name we already extracted
    certificateFormData.append('seller_id', seller_id);
    
    if (get().status === "success") {
      await get().generatecertificate(certificateFormData);
    }
    set({issellerverify: true});
    console.log("Response from server:", response.data);
    toast.success("Seller verified successfully!");
    set({ issellerverify: true });
    return response;
  } catch (error) {
    console.error("Error verifying seller:", error);
    toast.error("An error occurred while verifying seller.");
    throw error; // It's good practice to re-throw the error
  }
  finally {
    set({isverificationprocessing: false});
  }
},


  generatecertificate: async (formData) => {
     try {
    const res = await axiosInstance.post("/certificate/generate_seller", formData, {
      responseType: 'blob', // Important for file downloads
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Create a download link for the PDF
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'seller_certificate.pdf');
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success("Certificate downloaded successfully!");
    return true;
  } catch (error) {
    console.log("Error in certificate seller generation:", error);
    toast.error(error.response?.data?.message || "Failed to generate certificate");
    return false;
  }
  }

}));


export default useEcosense;
;