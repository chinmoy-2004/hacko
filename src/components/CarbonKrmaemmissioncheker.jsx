import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import useCarbonKarmaStore from "../store/carbonKarma.store.js";

const EmissionChecker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputMethod, setInputMethod] = useState("form");
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    image: null
  });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [totalCarbon, setTotalCarbon] = useState(600);
  const { CheckEmmission, isemmissionchecked } = useCarbonKarmaStore();
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: "fashion", label: "Fashion" },
    { value: "groceries", label: "Groceries" },
    { value: "electronics", label: "Electronics" },
    { value: "home", label: "Home & Garden" },
    { value: "transport", label: "Transportation" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.description && !formData.image) {
      alert("Please provide either a description or upload an image.");
      return;
    }
    const submissionData = new FormData();
    submissionData.append('description', formData.description);
    if (formData.image) {
      submissionData.append('image', formData.image);
    }

    setIsLoading(true);
    try {
      // const response = await CheckEmmission(submissionData);
      // if (response) {
      //   setTotalCarbon(response.total_carbon);
      //   setIsModalOpen(false);
      //   setIsResultModalOpen(true);
      // }

       setTotalCarbon(600);
        setIsModalOpen(false);
        setIsResultModalOpen(true);

    } catch (error) {
      console.error("Error checking emission:", error);
      // Handle error appropriately, e.g., show a toast notification
    }
    finally{
      setIsLoading(false)
    }
   

    // Reset form
    setFormData({
      productName: "",
      category: "",
      description: "",
      image: null
    });
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsResultModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="pb-3">
        <h3 className="text-xl font-bold text-gray-800">🔍 Check Carbon Emission</h3>
      </div>

      <div className="p-6 pt-0">
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 cursor-pointer rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          📊 Check Carbon Emission
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/80"
              onClick={() => setIsModalOpen(false)}
            />

            <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[85vh] overflow-auto p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">Check Product Carbon Footprint</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md border ${inputMethod === "upload"
                      ? "bg-green-600 text-white"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    onClick={() => setInputMethod("upload")}
                  >
                    <Upload className="h-4 w-4" />
                    <span> Upload Image</span>
                  </button>
                  <button
                    type="button"
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md border ${inputMethod === "form"
                      ? "bg-green-600 text-white"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    onClick={() => setInputMethod("form")}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Form</span>
                  </button>
                </div>

                {inputMethod === "upload" ? (
                  <div className="space-y-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
                      onClick={triggerFileInput}
                    >
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        {formData.image ? formData.image.name : "Click to upload product image"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="productName" className="block text-sm font-medium mb-1">
                        Product Name
                      </label>
                      <input
                        id="productName"
                        name="productName"
                        type="text"
                        value={formData.productName}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="category" className="block text-sm font-medium mb-1">
                        Category
                      </label>
                      <button
                        type="button"
                        id="category"
                        className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-left flex justify-between items-center"
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      >
                        {formData.category
                          ? categories.find(c => c.value === formData.category)?.label
                          : "Select category"}
                        <span>▼</span>
                      </button>

                      {isCategoryOpen && (
                        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                          {categories.map((category) => (
                            <div
                              key={category.value}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, category: category.value }));
                                setIsCategoryOpen(false);
                              }}
                            >
                              {category.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the product..."
                        className="w-full min-h-[80px] rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full text-white font-medium py-3 rounded-md flex items-center cursor-pointer justify-center gap-2 ${isemmissionchecked || isLoading
                    ? "bg-green-600/70 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                    }`}
                  disabled={isemmissionchecked || isLoading || (inputMethod === "upload" && !formData.image)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    "Calculate Carbon Footprint"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {isResultModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/80"
              onClick={closeModals}
            />

            <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
              <button
                onClick={closeModals}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Carbon Emission Result</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-4">
                  <p className="text-lg font-semibold text-green-800 mb-1">Total Carbon Footprint</p>
                  <p className="text-3xl font-bold text-green-600">{totalCarbon}g CO₂e</p>
                </div>
                <button
                  onClick={closeModals}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md mt-4"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}



      </div>
    </div>
  );
};

export default EmissionChecker;