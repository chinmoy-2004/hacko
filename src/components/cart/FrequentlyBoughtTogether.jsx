import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast";

const FrequentlyBoughtTogether = () => {
  const { dispatch, cart } = useCart();

  // This can be later expanded into a dynamic array
  const frequentlyBoughtItem = {
    id: "fbt-1",
    title: "Natural Loofah Body Scrubbers",
    price: 1299,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100",
    certifications: ["Organic"],
    seller: "EcoSeller",
    inStock: true,
    delivery: "Tomorrow",
    carbonSaved: 0.7,
    quantity: 1
  };

  const handleAddToCart = () => {
    const itemExists = cart.some((item) => item.id === frequentlyBoughtItem.id);
    if (itemExists) {
      toast.error("Item already in cart");
    } else {
      dispatch({ type: "ADD_TO_CART", payload: frequentlyBoughtItem });
      toast.success("Added to Cart");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Frequently Bought Together</h2>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex gap-3 p-3 border rounded-lg">
            <img 
              src={frequentlyBoughtItem.image} 
              alt={frequentlyBoughtItem.title} 
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <h5 className="text-sm font-medium">{frequentlyBoughtItem.title}</h5>
              <p className="text-sm text-green-600 font-bold">₹{frequentlyBoughtItem.price}</p>
              <span className="border border-gray-300 px-2 py-1 rounded text-xs mt-1 inline-block">
                {frequentlyBoughtItem.certifications[0]}
              </span>
            </div>
            <button 
              className="border border-gray-300 hover:bg-gray-50 px-3 py-1 rounded text-sm self-start"
              onClick={handleAddToCart}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyBoughtTogether;
