import React from 'react';
import { Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const ProductDetails = ({ product, goBack, addToCart, user, cart, handleCheckout }) => {
  
  const isAdded = cart?.some((item) => item.id === product._id);

  const handleAddToCart = () => {
    if (!isAdded) {
      addToCart({ 
        ...product, 
        id: product._id 
      });
    }
  };

  const handleBuyNow = () => {
    handleCheckout(product.price);
  };

  if (!product) return null;

  return (
    <div className="h-full bg-white font-sans flex flex-col overflow-hidden">

      <div className="flex-1 max-w-screen-2xl mx-auto w-full p-4 md:p-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          
          <div className="flex items-center justify-center bg-gray-50 rounded-lg h-full p-4 relative">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain mix-blend-multiply absolute" 
            />
          </div>

          <div className="flex flex-col h-full overflow-y-auto pr-2 pb-2">
            
            <h1 className="text-2xl font-medium text-gray-800 mb-2 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center mb-3 space-x-2 text-sm text-blue-600">
              <div className="flex text-[#febd69]">
                {Array(5).fill().map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < product.rating ? "fill-current" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="hover:underline cursor-pointer">1,204 ratings</span>
            </div>

            <div className="border-t border-b border-gray-200 py-3 my-2">
              <p className="text-xs text-gray-500">List Price: <span className="line-through">₹{(product.price * 1.2).toFixed(2)}</span></p>
              <div className="flex items-start text-red-700">
                <span className="text-xs relative top-1">₹</span>
                <span className="text-3xl font-medium">{Math.floor(product.price)}</span>
                <span className="text-xs relative top-1">{(product.price % 1).toFixed(2).substring(1)}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                <span className="font-bold text-cyan-700">FREE delivery</span> by Amazon
              </p>
            </div>

            <div className="flex space-x-4 my-3 text-[10px] text-gray-500 text-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                  <RotateCcw size={14} />
                </div>
                <span>7 days<br/>Returnable</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                  <Truck size={14} />
                </div>
                <span>Amazon<br/>Delivered</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                  <ShieldCheck size={14} />
                </div>
                <span>1 Year<br/>Warranty</span>
              </div>
            </div>

            <div className="mt-2 flex-grow">
              <h3 className="font-bold text-sm mb-1">About this item</h3>
              <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1">
                <li>High quality material and design for long lasting usage.</li>
                <li>Official {product.category} product verified by Amazon.</li>
                <li>Top rated product in the {product.category} category.</li>
                <li>Includes standard accessories and manual.</li>
                <li>Experience premium quality with our trusted brand warranty.</li>
              </ul>
            </div>

            <div className="pt-4 mt-auto">
              {!user?.isAdmin ? (
                <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white md:w-3/4">
                  <h3 className="text-green-700 font-medium text-sm mb-2">In Stock.</h3>
                  
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAdded} 
                    className={`w-full py-2 rounded-full text-xs font-medium mb-2 transition-colors ${
                      isAdded 
                      ? "bg-green-400 hover:bg-green-500 border-green-500 cursor-default" 
                      : "bg-[#ffd814] hover:bg-[#f7ca00] border-[#fcd200]"
                    }`}
                  >
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                  
                  <button 
                    onClick={handleBuyNow}
                    className="w-full bg-[#ffa41c] hover:bg-[#fa8900] border-[#ff8f00] py-2 rounded-full text-xs font-medium"
                  >
                    Buy Now
                  </button>

                  <div className="text-[10px] text-gray-500 mt-3 space-y-1">
                    <div className="flex justify-between">
                      <span>Ships from</span>
                      <span>Amazon</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sold by</span>
                      <span>Amazon Retail</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-100 border border-gray-300 rounded text-center text-gray-500 md:w-3/4">
                  <p className="font-bold text-sm">Admin View</p>
                  <p className="text-[10px]">Purchasing disabled.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;