import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Star, Heart, ChevronDown, X, Loader2 } from 'lucide-react';
import { productService } from '../services/api';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  fabric: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFavorite?: boolean;
}

const FilterSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-sm font-medium text-gray-900"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && <div className="mt-4 space-y-2">{children}</div>}
    </div>
  );
};

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: '',
    fabric: '',
    sortBy: 'name'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productService.getAll();
        
        const formattedProducts: Product[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: Number(item.price),
          image: item.image,
          category: item.category,
          fabric: item.fabric,
          rating: 4.5,
          reviews: 0,
          isNew: item.stock > 0,
        }));

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => product.price >= min && (!max || product.price <= max));
    }
    if (filters.fabric) {
      filtered = filtered.filter(product => product.fabric.toLowerCase().includes(filters.fabric.toLowerCase()));
    }
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        default: return a.name.localeCompare(b.name);
      }
    });
    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const categories = [
    { label: 'All Categories', value: '' },
    { label: 'Soft Silk', value: 'soft-silk' },
    { label: 'Pure Silk', value: 'pure-silk' },
    { label: 'Kancheepuram Silk', value: 'kancheepuram-silk' },
    { label: 'Crepe Silk', value: 'crepe-silk' },
    { label: 'Semi Silk', value: 'semi-silk' },
    { label: 'Daily Wear', value: 'daily-wear' },
  ];

  const FilterContent = () => (
    <>
      <FilterSection title="Category">
        {categories.map((cat) => (
          <label key={cat.value} className="flex items-center">
            <input 
              type="radio" 
              name="category" 
              value={cat.value} 
              checked={filters.category === cat.value} 
              onChange={(e) => handleFilterChange('category', e.target.value)} 
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300" 
            />
            <span className="ml-2 text-sm text-gray-700">{cat.label}</span>
          </label>
        ))}
      </FilterSection>
      <FilterSection title="Price Range">
        {['', '0-2000', '2001-5000', '5001-10000', '10001-50000'].map((range) => (
          <label key={range} className="flex items-center">
            <input type="radio" name="priceRange" value={range} checked={filters.priceRange === range} onChange={(e) => handleFilterChange('priceRange', e.target.value)} className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300" />
            <span className="ml-2 text-sm text-gray-700">{range ? `₹${range.replace('-', ' - ₹')}` : 'All Prices'}</span>
          </label>
        ))}
      </FilterSection>
    </>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {filters.category ? categories.find(c => c.value === filters.category)?.label : 'All Sarees'}
          </h1>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden flex justify-between items-center">
            <button onClick={() => setIsFiltersOpen(true)} className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow border">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filters</span>
            </button>
            <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <aside className="hidden lg:block lg:w-64 bg-white rounded-lg shadow p-6 h-fit sticky top-24">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <FilterContent />
            <div className="border-b py-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Sort By</h3>
              <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </aside>

          {isFiltersOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsFiltersOpen(false)}>
              <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl z-50 p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button onClick={() => setIsFiltersOpen(false)} className="p-1"><X className="h-6 w-6" /></button>
                </div>
                <FilterContent />
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className={`grid gap-4 md:gap-6 ${isGridView ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className={`group bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden ${!isGridView ? 'flex' : ''}`}>
                  <div className={`relative overflow-hidden ${isGridView ? 'aspect-[3/4]' : 'w-48 h-auto'}`}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 bg-gray-100" />
                    {product.isNew && (<span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">NEW</span>)}
                  </div>
                  <div className={`p-4 flex flex-col ${isGridView ? '' : 'flex-1 justify-center'}`}>
                    <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors truncate">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 capitalize">{product.category.replace('-', ' ')}</p>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-orange-600">₹{product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
              {filteredProducts.length === 0 && (
                 <div className="col-span-full text-center py-10">
                    <p className="text-gray-500">No products found. Try changing the filters.</p>
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;