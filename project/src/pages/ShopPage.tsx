import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, Search, Grid2x2 as Grid, List } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

interface ShopPageProps {
  petType?: 'dog' | 'cat';
  title?: string;
  description?: string;
}

export default function ShopPage({ petType, title, description }: ShopPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [gridCols, setGridCols] = useState<'grid' | 'list'>('grid');

  // Filter states
  const selectedCategory = searchParams.get('category') || '';
  const selectedPriceRange = searchParams.get('price') || '';
  const selectedRating = searchParams.get('rating') || '';
  const sortBy = searchParams.get('sort') || 'featured';

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          supabase.from('products').select('*'),
          supabase.from('categories').select('*'),
        ]);

        setProducts(productsRes.data || []);
        const filteredCategories = petType
          ? (categoriesRes.data || []).filter((c) => c.pet_type === petType || c.pet_type === 'both')
          : categoriesRes.data || [];
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [petType]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by pet type
    if (petType) {
      filtered = filtered.filter((p) => p.pet_type === petType || p.pet_type === 'both');
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.short_description?.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      const category = categories.find((c) => c.slug === selectedCategory);
      if (category) {
        filtered = filtered.filter((p) => p.category_id === category.id);
      }
    }

    // Filter by price range
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter((p) => {
        if (max) {
          return p.price >= min && p.price <= max;
        }
        return p.price >= min;
      });
    }

    // Filter by rating
    if (selectedRating) {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case 'best-seller':
        filtered.sort((a, b) => (b.best_seller ? 1 : 0) - (a.best_seller ? 1 : 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [
    products,
    petType,
    searchQuery,
    selectedCategory,
    selectedPriceRange,
    selectedRating,
    sortBy,
    categories,
  ]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory || selectedPriceRange || selectedRating || searchQuery;

  const pageTitle = title || 'Shop All Products';
  const pageDescription = description || 'Discover premium products for your furry friends';

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
          <p className="text-gray-600">{pageDescription}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter & search */}
          <div className="lg:hidden space-y-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-medium"
            >
              <Filter className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>

            {filtersOpen && (
              <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-4">
                {/* Sort */}
                <div>
                  <label className="block font-medium text-sm text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-amber-400 outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="best-seller">Best Sellers</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                {/* Categories */}
                <div>
                  <label className="block font-medium text-sm text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-amber-400 outline-none"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block font-medium text-sm text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => updateFilter('price', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-amber-400 outline-none"
                  >
                    <option value="">All Prices</option>
                    <option value="0-25">Under $25</option>
                    <option value="25-50">$25 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200">$200+</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block font-medium text-sm text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={selectedRating}
                    onChange={(e) => updateFilter('rating', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-amber-400 outline-none"
                  >
                    <option value="">All Ratings</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-2 text-amber-600 font-medium hover:text-amber-700"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Filters card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-amber-600 hover:text-amber-700"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Sort */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-amber-400 outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="best-seller">Best Sellers</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                {/* Categories */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateFilter('category', '')}
                      className={`block text-sm ${
                        !selectedCategory
                          ? 'text-amber-600 font-medium'
                          : 'text-gray-600 hover:text-amber-600'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter('category', cat.slug)}
                        className={`block text-sm ${
                          selectedCategory === cat.slug
                            ? 'text-amber-600 font-medium'
                            : 'text-gray-600 hover:text-amber-600'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: '', label: 'All Prices' },
                      { value: '0-25', label: 'Under $25' },
                      { value: '25-50', label: '$25 - $50' },
                      { value: '50-100', label: '$50 - $100' },
                      { value: '100-200', label: '$100 - $200' },
                      { value: '200', label: '$200+' },
                    ].map((price) => (
                      <button
                        key={price.value}
                        onClick={() => updateFilter('price', price.value)}
                        className={`block text-sm ${
                          selectedPriceRange === price.value
                            ? 'text-amber-600 font-medium'
                            : 'text-gray-600 hover:text-amber-600'
                        }`}
                      >
                        {price.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: '', label: 'All Ratings' },
                      { value: '4.5', label: '4.5+ Stars' },
                      { value: '4', label: '4+ Stars' },
                      { value: '3.5', label: '3.5+ Stars' },
                    ].map((rating) => (
                      <button
                        key={rating.value}
                        onClick={() => updateFilter('rating', rating.value)}
                        className={`block text-sm ${
                          selectedRating === rating.value
                            ? 'text-amber-600 font-medium'
                            : 'text-gray-600 hover:text-amber-600'
                        }`}
                      >
                        {rating.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredProducts.length}</span> products
              </p>
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setGridCols('grid')}
                  className={`p-2 rounded-lg ${
                    gridCols === 'grid'
                      ? 'bg-amber-100 text-amber-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setGridCols('list')}
                  className={`p-2 rounded-lg ${
                    gridCols === 'list'
                      ? 'bg-amber-100 text-amber-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="hidden lg:flex flex-wrap gap-2 mb-4">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                    {categories.find((c) => c.slug === selectedCategory)?.name}
                    <button onClick={() => updateFilter('category', '')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedPriceRange && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                    Price: {selectedPriceRange === '200' ? '$200+' : `$${selectedPriceRange.replace('-', ' - $')}`}
                    <button onClick={() => updateFilter('price', '')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedRating && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                    {selectedRating}+ Stars
                    <button onClick={() => updateFilter('rating', '')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Loading */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="text-amber-600 font-medium hover:text-amber-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                className={
                  gridCols === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
