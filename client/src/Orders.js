import React from 'react';
import { Package, ArrowLeft } from 'lucide-react';

const Orders = ({ orders, goBack, addToCart, viewProduct, user }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-3 flex items-center shadow-sm">
        <button 
          onClick={goBack} 
          className="flex items-center text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} className="mr-1" /> Back to Store
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-4">Your Orders</h1>
      </div>

      <div className="max-w-screen-lg mx-auto p-4 md:p-8">
        
        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow-sm text-center border border-gray-200">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-bold text-gray-700">No orders yet</h2>
            <p className="text-gray-500 text-sm">Buy something to see it here!</p>
            <button 
              onClick={goBack}
              className="mt-4 bg-[#f0c14b] border border-[#a88734] px-6 py-2 rounded text-sm font-bold hover:bg-[#ddb347]"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-100 p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between text-sm text-gray-600">
                  <div className="flex space-x-8 mb-2 md:mb-0">
                    <div>
                      <span className="block text-xs uppercase font-bold text-gray-500">Order Placed</span>
                      <span className="text-gray-800">{order.date}</span>
                    </div>
                    <div>
                      <span className="block text-xs uppercase font-bold text-gray-500">Total</span>
                      <span className="text-gray-800">₹{order.total.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="block text-xs uppercase font-bold text-gray-500">Shiped To</span>
                      {/* --- UPDATED: Dynamic Name --- */}
                      <span className="text-blue-600 hover:underline cursor-pointer">{order.shipTo}</span>
                    </div>
                  </div>
                  <div className="flex items-start md:items-center">
                    <span className="text-xs text-gray-500">Order # {order.id}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  {/* --- UPDATED: Dynamic Status Color --- */}
                  <h3 className={`font-bold text-lg mb-2 ${order.status === 'Delivered' ? 'text-green-700' : 'text-orange-600'}`}>
                    {order.status}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 font-medium">
                    {order.status === 'Delivered' 
                      ? 'Package was handed to resident' 
                      : 'Your package is on its way'
                    }
                  </p>

                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-20 h-20 object-contain mr-4 cursor-pointer"
                          onClick={() => viewProduct(item)}
                        />
                        <div className="flex-1">
                          <p 
                            className="font-medium text-blue-600 hover:underline line-clamp-2 cursor-pointer"
                            onClick={() => viewProduct(item)}
                          >
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Return window closed on {order.returnDate}</p>
                          
                          <div className="mt-2 flex gap-2">
                            {/* --- UPDATED: Conditionally Render Buy Button --- */}
                            {!user?.isAdmin && (
                              <button 
                                onClick={() => addToCart(item)}
                                className="text-xs bg-[#ffd814] border border-[#fcd200] px-3 py-1 rounded hover:bg-[#f7ca00]"
                              >
                                Buy it again
                              </button>
                            )}
                            <button 
                              onClick={() => viewProduct(item)}
                              className="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-50"
                            >
                              View your item
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Footer Actions */}
                <div className="bg-gray-50 p-3 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:underline font-medium">
                    Archive Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;