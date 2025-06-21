import { useState, useEffect, use } from 'react';
import useSellerStore from '../store/Seller.store.js';



const EcoCertifiedProductsTable = () => {

  const {downloadcertificate}=useSellerStore()
  
  const {products}=useSellerStore.getState();

  // Sample product data
  const initialProducts = [
    {
      ect_id: 'ECT-2023-001',
      product_name: 'Organic Cotton T-Shirt',
      manufacturer: 'GreenWear Inc.',
      category: 'Apparel',
      carbon_kg: 2.5,
      eco_certified: false
    },
    {
      ect_id: 'ECT-2023-002',
      product_name: 'Bamboo Toothbrush',
      manufacturer: 'EcoOral',
      category: 'Personal Care',
      carbon_kg: 0.3,
      eco_certified: true
    },
    {
      ect_id: 'ECT-2023-003',
      product_name: 'Recycled Notebook',
      manufacturer: 'PaperPlanet',
      category: 'Stationery',
      carbon_kg: 0.8,
      eco_certified: true
    },
    {
      ect_id: 'ECT-2023-004',
      product_name: 'Solar Charger',
      manufacturer: 'SunPower Tech',
      category: 'Electronics',
      carbon_kg: 1.2,
      eco_certified: true
    }
  ];

  const [Products, setProducts] = useState(products? products : initialProducts);
  const [firstRowStatus, setFirstRowStatus] = useState('Pending');
  const [showFirstRowDownload, setShowFirstRowDownload] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstRowStatus('Complete');
      setShowFirstRowDownload(true);
      
      // Update the first product's certification status
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts];
        updatedProducts[0] = {
          ...updatedProducts[0],
          eco_certified: true
        };
        return updatedProducts;
      });
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async(ectId) => {
     await downloadcertificate(ectId);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">🌿 Recent Certified Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ECT ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbon (kg)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Products.map((product, index) => (
              <tr key={product.ect_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index === 0 ? (showFirstRowDownload ? product.ect_id : '') : product.ect_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.product_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.manufacturer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.carbon_kg}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index === 0 ? (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      firstRowStatus === 'Complete' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {firstRowStatus}
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Complete
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(index !== 0 || showFirstRowDownload) && (
                    <button
                      onClick={() => handleDownload(product.ect_id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                      Download
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EcoCertifiedProductsTable;