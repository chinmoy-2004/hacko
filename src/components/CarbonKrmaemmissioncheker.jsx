import { useState } from "react";
import { Camera, FileText } from "lucide-react";

const EmissionChecker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputMethod, setInputMethod] = useState("form");
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: ""
  });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="pb-3">
        <h3 className="text-xl font-bold text-gray-800">🔍 Check Carbon Emission</h3>
      </div>
      
      <div className="p-6 pt-0">
        <button 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md"
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
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md border ${
                      inputMethod === "camera" 
                        ? "bg-green-600 text-white" 
                        : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setInputMethod("camera")}
                  >
                    <Camera className="h-4 w-4" />
                    <span> Camera</span>
                  </button>
                  <button
                    type="button"
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md border ${
                      inputMethod === "form" 
                        ? "bg-green-600 text-white" 
                        : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setInputMethod("form")}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Form</span>
                  </button>
                </div>

                {inputMethod === "camera" ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Take a photo of your product</p>
                      <button 
                        type="button"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                      >
                        Open Camera
                      </button>
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
                        Description (Optional)
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
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md"
                >
                  Calculate Carbon Footprint
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmissionChecker;