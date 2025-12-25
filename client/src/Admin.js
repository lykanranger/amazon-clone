import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Plus, 
  Edit2, 
  Save, 
  LayoutDashboard, 
  ShoppingBag, 
  IndianRupee, 
  ArrowLeft,
  Users,
  Package,
  Box,
  Tags, // New icon for Categories
  X
} from 'lucide-react';

const Admin = ({ goBack, orders, users, onUpdateStatus }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'orders', 'users', 'categories'
  
  // --- CATEGORIES STATE (New) ---
  // Load from localStorage or use defaults
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('app_categories');
    return saved ? JSON.parse(saved) : ['Electronics', 'Smartphones', 'Books', 'Kitchen', 'Wearables', 'Clothing'];
  });
  const [newCategory, setNewCategory] = useState('');

  // Persist categories when they change
  useEffect(() => {
    localStorage.setItem('app_categories', JSON.stringify(categories));
  }, [categories]);

  // --- PRODUCT STATE ---
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    price: '',
    image: '',
    category: categories[0], // Default to first category
    rating: 5
  });

  // Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch products");
      setLoading(false);
    }
  };

  // --- FORM HANDLERS ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditClick = (product) => {
    setForm(product);
    setIsEditing(true);
    setCurrentId(product._id);
    setActiveTab('inventory'); // Switch to inventory tab if not already
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleCancelEdit = () => {
    setForm({ title: '', price: '', image: '', category: categories[0], rating: 5 });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditing) {
      await fetch(`http://localhost:5000/api/products/${currentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    } else {
      await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    }

    handleCancelEdit(); 
    fetchProducts(); 
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  // --- CATEGORY HANDLERS (New) ---
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (catToDelete) => {
    if (window.confirm(`Delete category "${catToDelete}"?`)) {
      setCategories(categories.filter(c => c !== catToDelete));
      // Reset form category if selected one was deleted
      if (form.category === catToDelete) {
        setForm({...form, category: categories[0]});
      }
    }
  };

  const totalValue = products.reduce((acc, curr) => acc + Number(curr.price), 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2 rounded-lg">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        
        <div className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'inventory' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Box size={20} className="mr-3"/> Inventory
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'categories' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Tags size={20} className="mr-3"/> Categories
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Package size={20} className="mr-3"/> Orders
            {orders && orders.length > 0 && <span className="ml-auto bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-0.5 rounded-full">{orders.length}</span>}
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users size={20} className="mr-3"/> Users
            {users && users.length > 0 && <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{users.length}</span>}
          </button>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={goBack} 
            className="flex items-center w-full p-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-3" /> Return to Store
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Top Stats (Visible on all tabs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="text-gray-400 mb-2 flex items-center gap-2"><ShoppingBag size={18}/> Total Products</div>
             <div className="text-3xl font-bold text-gray-800">{products.length}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="text-gray-400 mb-2 flex items-center gap-2"><Package size={18}/> Total Orders</div>
             <div className="text-3xl font-bold text-gray-800">{orders ? orders.length : 0}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="text-gray-400 mb-2 flex items-center gap-2"><IndianRupee size={18}/> Inventory Value</div>
             <div className="text-3xl font-bold text-gray-800">₹{Math.floor(totalValue)}</div>
          </div>
        </div>

        {/* --- INVENTORY TAB --- */}
        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Form */}
             <div className="lg:col-span-1">
                <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6 ${isEditing ? 'ring-2 ring-indigo-500' : ''}`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center">
                      {isEditing ? <Edit2 size={18} className="mr-2 text-indigo-600"/> : <Plus size={18} className="mr-2 text-green-600"/>}
                      {isEditing ? "Edit Product" : "Add Product"}
                    </h2>
                    {isEditing && (
                      <button onClick={handleCancelEdit} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600">
                        Cancel
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Product Title</label>
                      <input 
                        name="title" 
                        value={form.title} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Image URL</label>
                      <input 
                        name="image" 
                        value={form.image} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Price (₹)</label>
                        <input 
                          name="price" 
                          type="number" 
                          value={form.price} 
                          onChange={handleChange} 
                          required 
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Category</label>
                        <select 
                          name="category" 
                          value={form.category} 
                          onChange={handleChange} 
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          {/* --- DYNAMIC CATEGORIES --- */}
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="pt-2">
                      <button 
                        type="submit" 
                        className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                          isEditing ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-900 hover:bg-black"
                        }`}
                      >
                        {isEditing ? <Save size={18}/> : <Plus size={18}/>}
                        {isEditing ? "Update" : "Create"}
                      </button>
                    </div>
                  </form>
                </div>
             </div>

             {/* Table */}
             <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">Product List</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                      <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                        <tr>
                          <th className="p-4">Product</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Price</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {loading ? (
                           <tr><td colSpan="4" className="p-8 text-center">Loading...</td></tr>
                        ) : products.length === 0 ? (
                           <tr><td colSpan="4" className="p-8 text-center text-gray-400">No products found</td></tr>
                        ) : products.map(p => (
                          <tr key={p._id} className="hover:bg-gray-50 transition-colors group">
                            <td className="p-4 flex items-center gap-3">
                              <div className="w-10 h-10 rounded border border-gray-200 bg-white p-1">
                                <img src={p.image} alt="" className="w-full h-full object-contain"/>
                              </div>
                              <span className="font-medium text-gray-900 line-clamp-1 w-48">{p.title}</span>
                            </td>
                            <td className="p-4">{p.category}</td>
                            <td className="p-4 font-medium text-gray-900">₹{p.price}</td>
                            <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => handleEditClick(p)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"><Edit2 size={16}/></button>
                                  <button onClick={() => handleDelete(p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                                </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
             </div>
          </div>
        )}

        {/* --- CATEGORIES TAB (New) --- */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Category Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <Plus size={18} className="mr-2 text-green-600"/> Add Category
                </h2>
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Category Name</label>
                    <input 
                      value={newCategory} 
                      onChange={(e) => setNewCategory(e.target.value)} 
                      required 
                      placeholder="e.g. Gaming"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 px-4 rounded-lg bg-gray-900 hover:bg-black text-white font-medium shadow-md transition-transform active:scale-95"
                  >
                    Add Category
                  </button>
                </form>
              </div>
            </div>

            {/* Category List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800">Available Categories</h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-3">
                    {categories.map(cat => (
                      <div key={cat} className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 group">
                        <span className="font-medium text-gray-700 mr-3">{cat}</span>
                        <button 
                          onClick={() => handleDeleteCategory(cat)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">Customer Orders</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm text-gray-600">
                 <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                   <tr>
                     <th className="p-4">Order ID</th>
                     <th className="p-4">Customer</th>
                     <th className="p-4">Date</th>
                     <th className="p-4">Items</th>
                     <th className="p-4">Total</th>
                     <th className="p-4">Status</th>
                     <th className="p-4">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {!orders || orders.length === 0 ? (
                     <tr><td colSpan="7" className="p-8 text-center text-gray-400">No orders found</td></tr>
                   ) : orders.map(order => (
                     <tr key={order.id} className="hover:bg-gray-50">
                       <td className="p-4 font-mono text-xs">#{order.id}</td>
                       <td className="p-4 font-medium text-gray-900">{order.shipTo}</td>
                       <td className="p-4">{order.date}</td>
                       <td className="p-4">
                          <div className="flex -space-x-2 overflow-hidden">
                            {order.items.slice(0, 4).map((item, idx) => (
                                <img 
                                  key={idx} 
                                  src={item.image} 
                                  alt={item.title} 
                                  title={item.title}
                                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-contain bg-white border border-gray-200" 
                                />
                            ))}
                            {order.items.length > 4 && (
                              <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 text-xs font-medium text-gray-500">
                                +{order.items.length - 4}
                              </div>
                            )}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-1">{order.items.length} items</div>
                       </td>
                       <td className="p-4 font-medium">₹{order.total.toFixed(2)}</td>
                       <td className="p-4">
                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                           order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                           order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                           'bg-yellow-100 text-yellow-700'
                         }`}>
                           {order.status}
                         </span>
                       </td>
                       <td className="p-4">
                          <select 
                            className="border border-gray-300 rounded text-xs p-1 bg-white outline-none cursor-pointer"
                            value={order.status}
                            onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                          >
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Arriving Soon</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {/* --- USERS TAB --- */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">Registered Users</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm text-gray-600">
                 <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                   <tr>
                     <th className="p-4">User ID</th>
                     <th className="p-4">Name</th>
                     <th className="p-4">Email</th>
                     <th className="p-4">Role</th>
                     <th className="p-4">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {!users || users.length === 0 ? (
                      <tr><td colSpan="5" className="p-8 text-center text-gray-400">No users found</td></tr>
                   ) : users.map(u => (
                     <tr key={u.id} className="hover:bg-gray-50">
                       <td className="p-4 font-mono text-xs">{u.id}</td>
                       <td className="p-4 font-medium text-gray-900">{u.name}</td>
                       <td className="p-4">{u.email}</td>
                       <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            u.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {u.role}
                          </span>
                       </td>
                       <td className="p-4"><span className="text-green-600 text-xs font-bold">Active</span></td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;