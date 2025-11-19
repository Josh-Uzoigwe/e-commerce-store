import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useAuth } from '../contexts/AuthContext';
import { Product, ProductCategory } from '../types';

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { user } = useAuth();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});

  if (!user?.isAdmin) return <div className="p-10 text-center text-red-500">Access Denied</div>;

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm(product);
  };

  const handleCreate = () => {
    setEditingId('new');
    setForm({
      title: '',
      price: 0,
      description: '',
      category: ProductCategory.ELECTRONICS,
      stock: 0,
      image: 'https://picsum.photos/400/400',
      rating: 0
    });
  };

  const handleSave = () => {
    if (!form.title || !form.price) return;
    
    if (editingId === 'new') {
      const newProduct = {
        ...form,
        id: Date.now().toString(),
      } as Product;
      addProduct(newProduct);
    } else {
      updateProduct(form as Product);
    }
    setEditingId(null);
    setForm({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={handleCreate} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded">
          + Add Product
        </button>
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-secondary p-6 rounded-lg w-full max-w-2xl border border-slate-600 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingId === 'new' ? 'Create Product' : 'Edit Product'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                className="bg-slate-900 border border-slate-600 p-2 rounded"
                placeholder="Title"
                value={form.title || ''}
                onChange={e => setForm({...form, title: e.target.value})}
              />
              <input 
                className="bg-slate-900 border border-slate-600 p-2 rounded"
                type="number"
                placeholder="Price"
                value={form.price || 0}
                onChange={e => setForm({...form, price: Number(e.target.value)})}
              />
              <select 
                 className="bg-slate-900 border border-slate-600 p-2 rounded"
                 value={form.category}
                 onChange={e => setForm({...form, category: e.target.value as ProductCategory})}
              >
                {Object.values(ProductCategory).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input 
                className="bg-slate-900 border border-slate-600 p-2 rounded"
                type="number"
                placeholder="Stock"
                value={form.stock || 0}
                onChange={e => setForm({...form, stock: Number(e.target.value)})}
              />
              <textarea 
                 className="bg-slate-900 border border-slate-600 p-2 rounded md:col-span-2"
                 placeholder="Description"
                 rows={3}
                 value={form.description || ''}
                 onChange={e => setForm({...form, description: e.target.value})}
              />
              <input 
                className="bg-slate-900 border border-slate-600 p-2 rounded md:col-span-2"
                placeholder="Image URL"
                value={form.image || ''}
                onChange={e => setForm({...form, image: e.target.value})}
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-white">Cancel</button>
              <button onClick={handleSave} className="bg-accent px-4 py-2 rounded text-white">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-secondary rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 text-gray-400 border-b border-slate-700">
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.image} className="w-10 h-10 rounded object-cover" alt="" />
                  <span className="font-medium">{p.title}</span>
                </td>
                <td className="p-4 text-gray-300">{p.category}</td>
                <td className="p-4">${p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(p)} className="text-accent hover:text-blue-400 mr-4">Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
