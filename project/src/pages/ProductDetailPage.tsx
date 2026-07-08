import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ChevronRight, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product, Review } from '../lib/supabase';
import { useCart } from '../lib/cart';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;
      setLoading(true);
      try {
        const { data: productData, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;
        if (!productData) {
          setLoading(false);
          return;
        }

        setProduct(productData);

        // Fetch reviews
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('*')
          .eq('product_id', productData.id)
          .order('created_at', { ascending: false });

        setReviews(reviewsData || []);

        // Fetch related products
        const { data: relatedData } = await supabase
          .from('products')
          .select('*')
          .eq('pet_type', productData.pet_type)
          .neq('id', productData.id)
          .limit(4);

        setRelatedProducts(relatedData || []);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setAdding(false);
    }
  };

  const discount = product?.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link to="/shop" className="text-amber-600 hover:text-amber-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-amber-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/shop" className="text-gray-500 hover:text-amber-600">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to={product.pet_type === 'dog' ? '/dogs' : '/cats'}
              className="text-gray-500 hover:text-amber-600"
            >
              {product.pet_type === 'dog' ? 'Dog Products' : 'Cat Products'}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Images */}
            <div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={product.images[selectedImage] || product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[product.image_url, ...product.images.filter((img) => img !== product.image_url)].map(
                    (img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === i
                            ? 'border-amber-500'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.featured && (
                  <span className="bg-amber-100 text-amber-700 text-sm font-medium px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
                {product.best_seller && (
                  <span className="bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-red-100 text-red-700 text-sm font-medium px-3 py-1 rounded-full">
                    Save {discount}%
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews_count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.compare_at_price && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.compare_at_price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.short_description}</p>

              {/* Stock status */}
              <div className="flex items-center gap-2 mb-6">
                {product.stock > 0 ? (
                  <>
                    <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                    <span className="text-green-600 font-medium">In Stock</span>
                    <span className="text-gray-500">({product.stock} available)</span>
                  </>
                ) : (
                  <>
                    <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={adding || product.stock === 0}
                  className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all ${
                    added
                      ? 'bg-green-500'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      {adding ? 'Adding...' : 'Add to Cart'}
                    </>
                  )}
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
                  <Heart className="w-5 h-5" />
                  Add to Wishlist
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>

              {/* Delivery info */}
              <div className="bg-stone-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">30-day easy returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Secure checkout</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full description */}
          <div className="border-t">
            <div className="p-6 lg:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Customer Reviews ({reviews.length})
            </h2>
            <button className="text-amber-600 font-medium hover:text-amber-700">
              Write a Review
            </button>
          </div>

          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="pb-6 border-b last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-amber-700 font-semibold">
                        {review.author_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{review.author_name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-gray-200 text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        {review.verified_purchase && (
                          <span className="text-xs text-green-600">Verified Purchase</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {review.title && <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>}
                  <p className="text-gray-600">{review.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
