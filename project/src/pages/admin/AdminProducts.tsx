import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, X, UploadCloud, Star, Video, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { productService } from '../../services/api'; 

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  fabric: string;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  videoUrl?: string; // Optional video URL
  createdAt: string;
  specifications?: Record<string, string>;
  isFeatured?: boolean;
  colors?: string[];
}

interface ProductFormState extends Omit<Product, 'id' | 'createdAt'> {
  id?: string;
  createdAt?: string;
  imageFile?: File | null;
  videoFile?: File | null;
}

const ProductFormModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onSave: (product: ProductFormState) => Promise<void>;
  isSaving: boolean;
}> = ({ product, onClose, onSave, isSaving }) => {
  const [formData, setFormData] = useState<ProductFormState>(
    product ? { ...product, imageFile: null, videoFile: null } : {
      name: '',
      price: 0,
      category: 'soft-silk',
      fabric: '',
      stock: 0,
      status: 'active',
      image: '',
      videoUrl: '',
      imageFile: null,
      videoFile: null,
      isFeatured: false,
      colors: [],
      specifications: {
        'Fabric': 'Soft Silk',
        'Care': 'Dry Clean Only',
      },
    }
  );
  
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [colorInput, setColorInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ 
        ...prev, 
        image: URL.createObjectURL(file),
        imageFile: file 
      }));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ 
        ...prev, 
        videoFile: file 
      }));
    }
  };

  // --- Color Handlers ---
  const handleAddColor = (e: React.MouseEvent) => {
    e.preventDefault();
    if (colorInput.trim()) {
      setFormData(prev => ({
        ...prev,
        colors: [...(prev.colors || []), colorInput.trim()]
      }));
      setColorInput('');
    }
  };

  const handleRemoveColor = (colorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      colors: (prev.colors || []).filter(c => c !== colorToRemove)
    }));
  };
  // ----------------------

  const handleAddSpecification = () => {
    if (specKey && specValue) {
      setFormData(prev => ({
        ...prev,
        specifications: { ...prev.specifications, [specKey]: specValue },
      }));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const handleRemoveSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} disabled={isSaving}><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Featured Checkbox */}
          <div className="bg-orange-50 p-3 rounded-md border border-orange-100 flex items-center space-x-3">
             <input 
                type="checkbox" 
                id="isFeatured" 
                name="isFeatured" 
                checked={formData.isFeatured || false} 
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
             />
             <label htmlFor="isFeatured" className="text-sm font-medium text-gray-800 flex items-center cursor-pointer">
                <Star className="h-4 w-4 text-orange-500 mr-2 fill-current" />
                Mark as Featured Product
             </label>
          </div>

          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-md p-2 mt-1" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border rounded-md p-2 mt-1" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full border rounded-md p-2 mt-1" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-md p-2 mt-1">
                <option value="soft-silk">Soft Silk</option>
                <option value="pure-silk">Pure Silk</option>
                <option value="kancheepuram-silk">Kancheepuram Silk</option>
                <option value="crepe-silk">Crepe Silk</option>
                <option value="semi-silk">Semi Silk</option>
                <option value="daily-wear">Daily Wear</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Fabric</label>
              <input type="text" name="fabric" value={formData.fabric} onChange={handleChange} className="w-full border rounded-md p-2 mt-1" required />
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Available Colors</label>
            <div className="flex gap-2 mb-2">
              <input 
                type="text" 
                value={colorInput} 
                onChange={(e) => setColorInput(e.target.value)}
                placeholder="Type color (e.g. Red)" 
                className="flex-1 border rounded-md p-2 text-sm" 
              />
              <button 
                onClick={handleAddColor} 
                className="bg-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.colors && formData.colors.map((color, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {color}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveColor(color)}
                    className="ml-1.5 h-3.5 w-3.5 text-blue-500 hover:text-blue-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium">Image</label>
            {formData.image && (
              <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover rounded-md my-2 border" />
            )}
            <div className="mt-1 flex items-center space-x-2">
                <label className="cursor-pointer bg-gray-50 py-2 px-3 border border-gray-300 rounded-md text-sm hover:bg-gray-100 flex items-center">
                    <UploadCloud className="h-4 w-4 mr-2"/>
                    Upload Image
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
            </div>
          </div>

          {/* Video Upload (Optional) */}
          <div>
            <label className="block text-sm font-medium">Draping Video (Optional)</label>
            {formData.videoUrl && !formData.videoFile && (
               <p className="text-xs text-green-600 mt-1 flex items-center"><Video className="h-3 w-3 mr-1"/> Current video active</p>
            )}
            {formData.videoFile && (
               <p className="text-xs text-blue-600 mt-1 flex items-center"><Video className="h-3 w-3 mr-1"/> New video selected: {formData.videoFile.name}</p>
            )}
            <div className="mt-1 flex items-center space-x-2">
                <label className="cursor-pointer bg-gray-50 py-2 px-3 border border-gray-300 rounded-md text-sm hover:bg-gray-100 flex items-center">
                    <Video className="h-4 w-4 mr-2 text-gray-500"/>
                    {formData.videoUrl || formData.videoFile ? 'Change Video' : 'Upload Video'}
                    <input type="file" className="hidden" accept="video/*" onChange={handleVideoChange} />
                </label>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium mb-2">Specifications</label>
            <div className="space-y-2 mb-2">
              {formData.specifications && Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded">
                  <span className="font-medium">{key}:</span>
                  <span className="flex-1">{value}</span>
                  <button type="button" onClick={() => handleRemoveSpecification(key)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={specKey} onChange={(e) => setSpecKey(e.target.value)} placeholder="Name" className="w-1/3 border rounded p-2 text-sm" />
              <input type="text" value={specValue} onChange={(e) => setSpecValue(e.target.value)} placeholder="Value" className="flex-1 border rounded p-2 text-sm" />
              <button type="button" onClick={handleAddSpecification} className="bg-gray-200 px-3 rounded text-sm hover:bg-gray-300">Add</button>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md" disabled={isSaving}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md flex items-center" disabled={isSaving}>
              {isSaving && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productService.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Deleted successfully');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleSaveProduct = async (formData: ProductFormState) => {
    try {
      setIsSaving(true);
      let imageUrl = formData.image;
      let videoUrl = formData.videoUrl;

      // 1. Upload new image if selected
      if (formData.imageFile) {
        imageUrl = await productService.uploadImage(formData.imageFile);
      }

      // 2. Upload new video if selected
      if (formData.videoFile && productService.uploadVideo) {
         videoUrl = await productService.uploadVideo(formData.videoFile);
      }

      const productPayload = { ...formData, image: imageUrl, videoUrl: videoUrl };
      delete productPayload.imageFile; 
      delete productPayload.videoFile;

      if (formData.id) {
        // Update
        const updated = await productService.update(formData.id, productPayload);
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
        toast.success('Updated successfully!');
      } else {
        // Create
        const created = await productService.create(productPayload);
        setProducts(prev => [created, ...prev]);
        toast.success('Created successfully!');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save. Check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredProducts = products.filter(product => {
     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
     const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
     return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {isModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
          onSave={handleSaveProduct}
          isSaving={isSaving}
        />
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
          className="mt-4 sm:mt-0 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border rounded-md px-3 py-2"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Categories</option>
            <option value="soft-silk">Soft Silk</option>
            <option value="pure-silk">Pure Silk</option>
            <option value="kancheepuram-silk">Kancheepuram Silk</option>
            <option value="crepe-silk">Crepe Silk</option>
            <option value="semi-silk">Semi Silk</option>
            <option value="daily-wear">Daily Wear</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10"><Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-600" /></div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Colors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={product.image || 'https://placehold.co/50'} 
                        alt="" 
                        className="h-10 w-10 rounded object-cover bg-gray-200" 
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900 mr-2">{product.name}</div>
                            {product.isFeatured && <Star className="h-4 w-4 text-orange-500 fill-current" />}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">{product.category.replace('-', ' ')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{product.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                        {product.colors && product.colors.length > 0 ? (
                            product.colors.map(c => <span key={c} className="w-3 h-3 rounded-full border border-gray-300" style={{backgroundColor: c.toLowerCase()}} title={c}></span>)
                        ) : (
                            <span>-</span>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.status}
                        </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => { setEditingProduct(product); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-900"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;