'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import {
  ArrowLeft,
  Package,
  Plus,
  Edit,
  Trash2,
  Upload,
  Check,
  Clock,
  AlertCircle,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface InventoryProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minOrderQuantity: number;
  images: string[];
  status: 'active' | 'draft' | 'out_of_stock';
  lastUpdated: Date;
}

export default function InventoryPage() {
  const router = useRouter();
  const { user, isAuthenticated, userRole } = useStore();
  const [products, setProducts] = useState<InventoryProduct[]>([
    {
      id: 'prod-1',
      name: 'Grey black 600x600 yellow tile for bathroom and hotel',
      category: 'Tiles',
      price: 150,
      stock: 500,
      minOrderQuantity: 2,
      images: [],
      status: 'active',
      lastUpdated: new Date('2025-01-11'),
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    minOrderQuantity: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (userRole !== 'seller') {
      toast.error('Access denied. Switch to seller mode to manage inventory.');
      router.push('/account');
    }
  }, [isAuthenticated, userRole, router]);

  if (!isAuthenticated || !user || userRole !== 'seller') {
    return null;
  }

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error('Please fill all required fields');
      return;
    }

    const newProduct: InventoryProduct = {
      id: `prod-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      minOrderQuantity: parseInt(formData.minOrderQuantity) || 1,
      images: [],
      status: 'active',
      lastUpdated: new Date(),
    };

    setProducts([newProduct, ...products]);
    toast.success('Product added successfully!');
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      minOrderQuantity: '',
    });
    setShowAddForm(false);
  };

  const handleUpdateProduct = (productId: string, updates: Partial<InventoryProduct>) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, ...updates, lastUpdated: new Date() } : p
      )
    );
    toast.success('Product updated successfully!');
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== productId));
      toast.success('Product deleted successfully!');
    }
  };

  const getStockStatus = (product: InventoryProduct) => {
    if (product.stock === 0) return { label: 'Out of Stock', color: 'text-red-600', icon: AlertCircle };
    if (product.stock < 50) return { label: 'Low Stock', color: 'text-yellow-600', icon: AlertCircle };
    return { label: 'In Stock', color: 'text-green-600', icon: Check };
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === 'active').length,
    draft: products.filter((p) => p.status === 'draft').length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-teal mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Account</span>
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-teal/10 p-3 rounded-lg">
                <Package className="text-teal" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
                <p className="text-sm text-gray-600">Manage your products and stock</p>
              </div>
            </div>

            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition font-medium flex items-center gap-2"
              >
                <Plus size={20} />
                Add Product
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Package className="text-blue-600" size={24} />
                <span className="text-sm text-gray-600">Products</span>
              </div>
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Check className="text-green-600" size={24} />
                <span className="text-sm text-gray-600">Active</span>
              </div>
              <p className="text-3xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="text-yellow-600" size={24} />
                <span className="text-sm text-gray-600">Draft</span>
              </div>
              <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="text-red-600" size={24} />
                <span className="text-sm text-gray-600">Out of Stock</span>
              </div>
              <p className="text-3xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
          </div>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Product</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics & Components</option>
                  <option value="Textiles">Textiles & Apparel</option>
                  <option value="Tiles">Tiles & Building Materials</option>
                  <option value="Machinery">Machinery & Equipment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Piece (₹) *
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order Quantity
                </label>
                <input
                  type="number"
                  placeholder="Enter MOQ"
                  value={formData.minOrderQuantity}
                  onChange={(e) => setFormData({ ...formData, minOrderQuantity: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-teal transition cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-600">Click to upload images</p>
                  <input type="file" className="hidden" accept="image/*" multiple />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddProduct}
                className="bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition font-medium"
              >
                Add Product
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({
                    name: '',
                    category: '',
                    price: '',
                    stock: '',
                    minOrderQuantity: '',
                  });
                }}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Product List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Products</h2>

            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <span className="text-sm">Update</span>
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal">
              <option>Category</option>
              <option>Electronics</option>
              <option>Textiles</option>
              <option>Tiles</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal">
              <option>State: Delhi</option>
              <option>State: Mumbai</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal">
              <option>Product: All</option>
              <option>Product: Active</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
              <Search size={16} className="inline mr-2" />
              Search
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-teal text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Product Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product);
                  const Icon = stockStatus.icon;

                  return (
                    <tr key={product.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{product.name}</p>
                            <p className="text-xs text-gray-600">
                              Last updated: {product.lastUpdated.toLocaleDateString()} - Stock
                              updated from 200 to {product.stock}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-gray-800">
                          ₹{product.price} per Piece
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Icon size={16} className={stockStatus.color} />
                          <span className={`text-sm font-medium ${stockStatus.color}`}>
                            {product.stock}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProduct(product.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
