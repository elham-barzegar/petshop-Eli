import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '../lib/supabase';
import { useCart } from '../lib/cart';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  showBadges?: boolean;
}

export default function ProductCard({ product, showBadges = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [adding, setAdding] = useState(false);

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    try {
      await addToCart(product);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image_url}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Quick actions */}
        <div
          className={`absolute inset-0 bg-black/10 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-amber-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <div className="bg-white p-3 rounded-full shadow-lg">
            <Eye className="w-5 h-5 text-gray-700" />
          </div>
        </div>

        {/* Badges */}
        {showBadges && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                Featured
              </span>
            )}
            {product.best_seller && (
              <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                Best Seller
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                -{discount}%
              </span>
            )}
            {product.stock === 0 && (
              <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                Out of Stock
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviews_count})</span>
        </div>

        {/* Product name */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-gray-900">${product.price.toFixed(2)}</span>
          {product.compare_at_price && (
            <span className="text-sm text-gray-400 line-through">
              ${product.compare_at_price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
