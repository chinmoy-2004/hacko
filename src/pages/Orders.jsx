import { Star } from "lucide-react";

const orders = [
  {
    id: 1,
    title: "Bamboo Toothbrush | 100% Biodegradable & Eco-Friendly",
    price: 3.99,
    image: "https://m.media-amazon.com/images/I/61FJHgUF9eL._AC_UL480_FMwebp_QL65_.jpg",
    rating: 5,
    pickupDate: "Wed Jun 25 2025",
  },
  {
    id: 2,
    title: "Reusable Grocery Bags | Washable, Foldable & Eco Conscious (Set of 5)",
    price: 12.49,
    image: "https://m.media-amazon.com/images/I/91CBOHTz1gL._AC_UL480_FMwebp_QL65_.jpg",
    rating: 4,
    pickupDate: "Wed Jun 25 2025",
  },
  {
    id: 3,
    title: "Plant-Based Kitchen Sponge | Compostable & Plastic-Free (Pack of 6)",
    price: 6.99,
    image: "https://m.media-amazon.com/images/I/71R0JUPL0HL._AC_UL480_FMwebp_QL65_.jpg",
    rating: 4,
    pickupDate: "Wed Jun 25 2025",
  },
];

const Orders = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">Your Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="flex flex-col md:flex-row items-start gap-6 border-b pb-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={order.image}
              alt={order.title}
              className="w-40 h-40 object-contain bg-white p-2 rounded shadow-sm"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">{order.title}</h2>
            <div className="text-base font-bold text-green-700">${order.price}</div>
            <div className="flex text-yellow-500">
              {Array(order.rating)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
                ))}
            </div>
            <div className="text-sm text-gray-600">
              Expected pickup date for Cardboard packaging:{" "}
              <span className="font-semibold text-black">{order.pickupDate}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-4 md:mt-0">
            <button className="bg-orange-300 hover:bg-orange-400 text-black font-medium py-2 px-4 rounded shadow">
              Return or Replace items
            </button>
            <button className="bg-orange-300 hover:bg-orange-400 text-black font-medium py-2 px-4 rounded shadow">
              Write a product review
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded shadow">
              Return the Box
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
