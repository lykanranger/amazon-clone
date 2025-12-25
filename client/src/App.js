import React, { useState, createContext, useContext, useEffect } from 'react';
import Admin from './Admin';
import Login from './Login';
import ProductDetails from './ProductDetails';
import Checkout from './Checkout';
import Orders from './Orders';
import Profile from './Profile';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  MapPin, 
  Star, 
  X, 
  ChevronLeft,
  ChevronRight,
  ArrowLeft 
} from 'lucide-react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    const index = cart.findIndex((item) => item.id === productId);
    let newCart = [...cart];
    if (index >= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart?.reduce((amount, item) => item.price + amount, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// --- HEADER ---
const Header = ({ setShowCart, setView, user, handleLogout, searchTerm, setSearchTerm, view }) => {
  const { cart } = useCart();
  const [showDropdown, setShowDropdown] = useState(false); 

  return (
    <div className="sticky top-0 z-50">
      <div className="flex items-center bg-[#131921] p-2 flex-grow">
        <div 
          onClick={() => { setView('home'); setSearchTerm(''); }} 
          className="flex items-center mt-2 mx-4 cursor-pointer border border-transparent hover:border-white p-1 rounded-sm"
        >
           <img 
             className="w-24 mt-2 object-contain"
             src="/amazon-logo.png" 
             alt="amazon"
           />
        </div>

        <div className="hidden md:flex flex-col mx-2 text-white border border-transparent hover:border-white p-1 rounded-sm cursor-pointer">
          <span className="text-[12px] text-gray-300 ml-4">Deliver to</span>
          <div className="flex items-center font-bold text-sm">
            <MapPin size={15} />
            <span>Kerala, India</span>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="hidden sm:flex flex-1 items-center h-10 rounded-md overflow-hidden mx-4 bg-white hover:bg-[#f3a847]">
          <select className="h-full bg-gray-100 border-r border-gray-300 text-xs text-gray-600 px-2 outline-none">
            <option>All</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Smartphones</option>
          </select>
          <input 
            type="text" 
            className="h-full flex-1 p-2 outline-none text-black" 
            placeholder="Search Amazon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="h-full bg-[#febd69] hover:bg-[#f3a847] w-12 flex items-center justify-center cursor-pointer">
            <Search className="text-gray-800" size={24} />
          </div>
        </div>

        <div className="flex items-center justify-evenly text-white space-x-4 mx-4">
          
          {/* LOGIN / LOGOUT DROPDOWN */}
          <div 
            className="relative flex flex-col border border-transparent hover:border-white p-1 rounded-sm cursor-pointer"
            onClick={() => !user && setView('login')} 
            onMouseEnter={() => user && setShowDropdown(true)} 
            onMouseLeave={() => user && setShowDropdown(false)} 
          >
            <span className="text-[10px] md:text-[12px]">
              Hello, {user ? user.name : 'Sign in'}
            </span>
            <span className="text-[13px] md:text-sm font-bold flex items-center">
              Account & Lists
              {user && <span className="ml-1 text-[10px]">▼</span>}
            </span>

            {/* DROPDOWN MENU */}
            {user && showDropdown && (
              <div className="absolute top-full left-0 w-full bg-[#131921] rounded-b-sm border-x border-b border-gray-600 z-50 shadow-lg">
                
                <div className="px-2 py-2 border-b border-gray-700 bg-[#1a222d]">
                  <p className="text-[10px] text-gray-400 uppercase font-medium">User</p>
                  <p className="text-xs font-bold text-white truncate">{user.name}</p>
                </div>

                <div className="py-1">
                  {!user.isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        setView('profile');
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-2 py-1.5 text-[11px] text-gray-200 hover:bg-[#232f3e] hover:text-[#f0c14b] font-bold"
                    >
                      Profile
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-2 py-1.5 text-[11px] text-gray-200 hover:bg-[#232f3e] hover:text-[#f0c14b] font-bold"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {user && user.isAdmin && (
            <div onClick={() => setView('admin')} className="cursor-pointer text-white border border-transparent hover:border-white p-1">
              <span className="text-[13px] font-bold text-red-400">ADMIN</span>
            </div>
          )}

          <div 
            onClick={() => user ? setView('orders') : setView('login')}
            className="flex flex-col border border-transparent hover:border-white p-1 rounded-sm cursor-pointer"
          >
            <span className="text-[10px] md:text-[12px]">Returns</span>
            <span className="text-[13px] md:text-sm font-bold">& Orders</span>
          </div>

          <div 
            onClick={() => setShowCart(true)}
            className="flex items-end border border-transparent hover:border-white p-1 rounded-sm cursor-pointer"
          >
            <div className="relative">
              <span className="absolute -top-1 -right-2 bg-[#f08804] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cart.length}
              </span>
              <ShoppingCart size={28} />
            </div>
            <span className="hidden md:inline font-bold text-sm mt-2 ml-1">Cart</span>
          </div>
        </div>
      </div>

      {/* Sub Header / Navbar */}
      <div className="flex items-center bg-[#232f3e] text-white text-sm p-2 pl-6 pr-4 space-x-5 overflow-x-auto whitespace-nowrap scrollbar-hide">
        
        {/* Render Menu Items ONLY if NOT on Product Details page */}
        {view !== 'product_details' && (
          <>
            <div className="flex items-center font-bold cursor-pointer border border-transparent hover:border-white p-1">
              <Menu size={20} className="mr-1" /> All
            </div>
            {["Today's Deals", "Customer Service", "Registry", "Gift Cards", "Sell"].map((item) => (
              <p key={item} className="cursor-pointer border border-transparent hover:border-white p-1">{item}</p>
            ))}
          </>
        )}
        
        {/* Back to Results Button (Shown only on Product Details) */}
        {view === 'product_details' && (
          <div 
            onClick={() => setView('home')}
            className="flex items-center cursor-pointer border border-transparent hover:border-white p-1 text-[#febd69] font-bold ml-auto"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Results
          </div>
        )}
      </div>
    </div>
  );
};

const Product = ({ id, title, image, price, rating, category, onClick, user }) => {
  const { addToCart, cart } = useCart();
  const isAdded = cart.some((item) => item.id === id);

  const handleAdd = (e) => {
    e.stopPropagation(); 
    if (!isAdded) {
      addToCart({ id, title, image, price, rating });
    }
  };

  return (
    <div 
      className="relative flex flex-col m-2 bg-white z-30 p-5 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-200 min-w-[250px] flex-grow cursor-pointer"
    >
      <div onClick={onClick}>
        <div className="h-48 flex items-center justify-center mb-4">
           <img src={image} alt={title} className="max-h-full object-contain hover:scale-105 transition-transform duration-200" />
        </div>

        <div className="mb-2">
          <p className="line-clamp-2 text-sm font-medium hover:text-[#c7511f]">{title}</p>
          <div className="flex my-1">
            {Array(5).fill().map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={`${i < rating ? "text-[#febd69] fill-[#febd69]" : "text-gray-300"}`} 
              />
            ))}
          </div>
          <p className="text-xs text-blue-500 mb-2">1,234 ratings</p>
          <div className="text-xl font-medium">
            <small className="align-top text-xs">₹</small>
            {Math.floor(price)}
            <small className="align-top text-xs">{(price % 1).toFixed(2).substring(1)}</small>
          </div>
          <p className="text-xs text-gray-500 mt-1">Free Delivery by Amazon</p>
        </div>
      </div>

      {!user?.isAdmin ? (
        <button 
          onClick={handleAdd}
          className={`mt-auto w-full border border-gray-400 rounded-sm py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#f0c14b] active:from-[#f0c14b] active:to-[#f0c14b] ${
            isAdded 
            ? "bg-green-400 border-green-500 hover:bg-green-500 cursor-default" 
            : "bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f0c14b] hover:to-[#f7dfa5]"
          }`}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      ) : (
        <div className="mt-auto w-full py-1 text-xs text-center text-gray-400 border border-gray-200 rounded-sm bg-gray-50">
          Admin View Only
        </div>
      )}
    </div>
  );
};

const CartModal = ({ isOpen, onClose, handleCheckout }) => {
  const { cart, removeFromCart, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div 
        className="absolute inset-0 bg-black bg-opacity-70 transition-opacity"
        onClick={onClose}
      />
      <div className="relative ml-auto w-full max-w-md bg-[#eaeded] h-full shadow-xl flex flex-col animate-slideInRight">
        <div className="bg-[#232f3e] text-white p-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">Shopping Cart ({cart.length})</h2>
          <button onClick={onClose} className="p-1 hover:bg-white hover:text-[#232f3e] rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center mt-20">
              <h3 className="text-xl font-bold text-gray-700">Your Amazon Cart is empty</h3>
              <p className="text-sm text-blue-600 mt-2 cursor-pointer" onClick={onClose}>Shop today's deals</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex bg-white p-3 rounded shadow-sm">
                <img src={item.image} alt="" className="h-24 w-24 object-contain" />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium line-clamp-2 mb-1">{item.title}</p>
                  <p className="font-bold text-lg mb-2">₹{item.price}</p>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs bg-gray-100 border border-gray-300 px-2 py-1 rounded hover:bg-gray-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="bg-white p-4 border-t border-gray-300 shadow-lg">
              <div className="flex justify-between items-center mb-4">
               <span className="text-lg">Subtotal ({cart.length} items):</span>
               <span className="text-lg font-bold">₹{getCartTotal().toFixed(2)}</span>
              </div>
              <button 
                onClick={() => handleCheckout(getCartTotal())}
                className="w-full bg-[#f0c14b] border border-[#a88734] rounded-sm py-2 shadow-sm text-sm font-medium hover:bg-[#ddb347]"
              >
               Proceed to checkout
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    "/banner1.jpg", 
    "/banner2.jpg", 
    "/banner3.jpg",
    "/banner4.jpg",
    "/banner5.jpg",
    "/banner6.jpg",
    "/banner7.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-[#eaeded] to-transparent bottom-0 z-20" />
      
      <div className="flex overflow-hidden h-[250px] sm:h-[400px] relative group">
        {slides.map((slide, index) => (
          <img 
            key={index}
            src={slide} 
            alt={`Banner ${index + 1}`}
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <button 
          onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 text-white p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 text-white p-2 hover:bg-white hover:text-black hover:bg-opacity-20 rounded-full transition"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}

const MainContent = ({ 
  view, setView, user, handleLogin, handleLogout, handleCheckout, products, 
  categories, showCart, setShowCart, selectedProduct, viewProduct, checkoutTotal, orders, setOrders,
  updateOrderStatus, allUsers, 
  userProfile, handleSaveProfile,
  searchTerm, setSearchTerm 
}) => {
  const { addToCart, cart, clearCart } = useCart();

  const handleOrderSuccess = (shippingAddress) => {
    const newOrderId = Math.floor(Math.random() * 10000000);
    const newOrder = {
      id: newOrderId,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      total: checkoutTotal,
      items: [...cart], 
      status: 'Processing',
      shipTo: shippingAddress?.name || user?.name || 'Customer',
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setView('orders');
  };

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (view === 'login') {
    return <Login onLogin={handleLogin} goBack={() => setView('home')} />;
  }

  if (view === 'admin') {
     if (!user || !user.isAdmin) {
         setView('home');
         return null; 
     }
    return (
      <Admin 
        goBack={() => setView('home')} 
        orders={orders} 
        users={allUsers} 
        onUpdateStatus={updateOrderStatus} 
      />
    );
  }

  // --- PRODUCT DETAILS VIEW ---
  if (view === 'product_details' && selectedProduct) {
    return (
      <div className="h-screen flex flex-col bg-white overflow-hidden relative">
        <Header 
          setShowCart={setShowCart} 
          setView={setView} 
          user={user} 
          handleLogout={handleLogout} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          view={view} 
        />
        <div className="flex-1 overflow-hidden">
          <ProductDetails 
            product={selectedProduct} 
            goBack={() => setView('home')} 
            addToCart={addToCart}
            user={user} 
            cart={cart}
            handleCheckout={handleCheckout}
          />
        </div>
        <CartModal 
          isOpen={showCart} 
          onClose={() => setShowCart(false)} 
          handleCheckout={handleCheckout} 
        />
      </div>
    );
  }

  if (view === 'checkout') {
    return (
      <Checkout 
        total={checkoutTotal} 
        onCancel={() => setView('home')} 
        onSuccess={handleOrderSuccess}
        userProfile={userProfile} 
        user={user} 
      />
    );
  }

  if (view === 'orders') {
     if (!user) {
         setView('login');
         return null;
     }
    return (
      <Orders 
        orders={orders}
        goBack={() => setView('home')}
        addToCart={addToCart}
        viewProduct={viewProduct}
        user={user}
      />
    );
  }

  if (view === 'profile') {
    if (!user) {
        setView('login');
        return null;
    }
   return (
     <Profile 
       user={user}
       currentProfile={userProfile}
       onSave={handleSaveProfile}
       goBack={() => setView('home')}
     />
   );
 }

  return (
    <div className="bg-[#eaeded] min-h-screen font-sans">
      <Header 
        setShowCart={setShowCart} 
        setView={setView} 
        user={user} 
        handleLogout={handleLogout}
        searchTerm={searchTerm}     
        setSearchTerm={setSearchTerm} 
        view={view} // Pass view
      />
      
      <main className="max-w-screen-2xl mx-auto">
        {!searchTerm && <Banner />}

        <div className={`mx-5 relative z-30 pb-10 ${!searchTerm ? '-mt-16' : 'mt-5'}`}>
          
          {searchTerm ? (
             <div>
                <h2 className="text-xl font-bold mb-4 bg-white/90 p-2 rounded-md inline-block shadow-sm">
                  {filteredProducts.length > 0 ? `Results for "${searchTerm}"` : `No results for "${searchTerm}"`}
                </h2>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredProducts.map(product => (
                      <Product 
                        key={product._id} 
                        id={product._id} 
                        {...product} 
                        user={user} 
                        onClick={() => viewProduct(product)} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-10 bg-white rounded shadow-md">
                    <p className="text-gray-500">Try checking your spelling or use different keywords.</p>
                  </div>
                )}
             </div>
          ) : (
            categories.length > 0 ? (
              categories.map((category) => (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 capitalize bg-white/90 backdrop-blur-sm p-2 rounded-md inline-block shadow-sm text-gray-800">
                    {category}
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {products
                      .filter(product => product.category === category)
                      .map(product => (
                        <Product 
                          key={product._id} 
                          id={product._id} 
                          {...product} 
                          user={user} 
                          onClick={() => viewProduct(product)} 
                        />
                      ))
                    }
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-10 bg-white rounded shadow-md mt-10">
                <p>Loading products...</p>
              </div>
            )
          )}
        </div>
      </main>

      <CartModal 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
        handleCheckout={handleCheckout} 
      />
      
      <div className="bg-[#37475a] text-white text-center py-4 text-xs mt-10 hover:bg-[#485769] cursor-pointer">
          Back to top
      </div>
      <div className="bg-[#232f3e] text-gray-300 grid grid-cols-2 md:grid-cols-4 gap-8 px-10 py-10 text-xs">
          <div>
            <h5 className="font-bold text-white mb-2">Get to Know Us</h5>
            <p className="hover:underline cursor-pointer">Careers</p>
            <p className="hover:underline cursor-pointer">Blog</p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2">Make Money with Us</h5>
            <p className="hover:underline cursor-pointer">Sell products on Amazon</p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2">Amazon Payment Products</h5>
            <p className="hover:underline cursor-pointer">Amazon Business Card</p>
          </div>
            <div>
            <h5 className="font-bold text-white mb-2">Let Us Help You</h5>
            <p className="hover:underline cursor-pointer">Your Account</p>
          </div>
      </div>
    </div>
  );
};

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('home'); 
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('app_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('app_orders', JSON.stringify(orders));
  }, [orders]);

  const [allUsers, setAllUsers] = useState(() => {
    const savedUsers = localStorage.getItem('app_users');
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      return parsedUsers.filter(u => 
        u.email !== 'john@example.com' && 
        u.email !== 'jane@test.com'
      );
    }
    return [
      { id: 1, name: 'Admin', email: 'admin@gmail.com', role: 'Admin' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(allUsers));
  }, [allUsers]);

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, [view]);

  const handleLogin = (email, password) => {
    if (email === 'admin@gmail.com' && password === '123456') {
      setUser({ name: 'Admin', email: email, isAdmin: true });
      setView('admin');
    } else {
      const savedProfileKey = `profile_${email}`;
      const savedProfileData = localStorage.getItem(savedProfileKey);
      let parsedProfile = null;
      
      if (savedProfileData) {
        parsedProfile = JSON.parse(savedProfileData);
      }

      const userName = parsedProfile?.name || email.split('@')[0];
      const newUser = { name: userName, email: email, isAdmin: false };
      
      setUser(newUser);
      setUserProfile(parsedProfile); 
      setView('home');

      setAllUsers(prevUsers => {
        const exists = prevUsers.some(u => u.email === email);
        if (!exists) {
          return [...prevUsers, { 
            id: Date.now(), 
            name: userName, 
            email: email, 
            role: 'Customer' 
          }];
        }
        return prevUsers;
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserProfile(null);
    setView('home');
    setSearchTerm('');
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setView('product_details');
  };

  const handleCheckout = (amount) => {
    if (!user) {
      alert("Please sign in to proceed to checkout");
      setView('login');
      return;
    }
    setCheckoutTotal(amount);
    setShowCart(false); 
    setView('checkout');
  };

  const handleSaveProfile = (data) => {
    setUserProfile(data);
    
    if (data.name && user) {
      setUser(prev => ({ ...prev, name: data.name }));
      
      setAllUsers(prevUsers => prevUsers.map(u => 
        u.email === user.email ? { ...u, name: data.name } : u
      ));
    }

    if (user && user.email) {
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(data));
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <CartProvider>
      <MainContent 
        view={view} 
        setView={setView} 
        user={user} 
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        handleCheckout={handleCheckout}
        checkoutTotal={checkoutTotal}
        orders={orders} 
        setOrders={setOrders}
        updateOrderStatus={updateOrderStatus} 
        allUsers={allUsers} 
        products={products}
        categories={categories}
        showCart={showCart}
        setShowCart={setShowCart}
        selectedProduct={selectedProduct}
        viewProduct={viewProduct}
        userProfile={userProfile} 
        handleSaveProfile={handleSaveProfile}
        searchTerm={searchTerm}     
        setSearchTerm={setSearchTerm} 
      />
    </CartProvider>
  );
};

export default App;