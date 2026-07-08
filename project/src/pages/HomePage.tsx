import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote, Dog, Cat, Gift } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product, Category, Review } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          featuredRes,
          bestSellersRes,
          categoriesRes,
          reviewsRes,
        ] = await Promise.all([
          supabase.from('products').select('*').eq('featured', true).limit(4),
          supabase.from('products').select('*').eq('best_seller', true).limit(4),
          supabase.from('categories').select('*').order('display_order'),
          supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(6),
        ]);

        setFeaturedProducts(featuredRes.data || []);
        setBestSellers(bestSellersRes.data || []);
        setCategories(categoriesRes.data || []);
        setReviews(reviewsRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const dogCategories = categories.filter((c) => c.pet_type === 'dog');
  const catCategories = categories.filter((c) => c.pet_type === 'cat');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium text-amber-700 shadow-sm mb-6">
                <Gift className="w-4 h-4" />
                <span>Free shipping on orders over $50</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Everything Your Needs{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Furry Friend
                </span>{' '}

              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Premium pet supplies for dogs and cats. Quality products, happy pets, delighted
                pet parents. Shop with confidence at Pet Shop Eli.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-md"
                >
                  Learn More
                </Link>
              </div>
              {/* Stats */}
              <div className="flex gap-8 mt-10">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">5K+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">200+</p>
                  <p className="text-sm text-gray-500">Products</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">4.9</p>
                  <p className="text-sm text-gray-500">Rating</p>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative z-10">
                <img
                  // src="https://images.pexels.com/photos/2203122/pexels-photo-2203122.jpeg?auto=compress&cs=tinysrgb&w=800"
                 src="https://images.unsplash.com/photo-1573435567032-ff5982925350?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMHx8Y2F0JTIwYW5kJTIwZG9nfGVufDB8fHx8MTc4MjcxNTcyNHww&ixlib=rb-4.1.0&fit=max&q=80"
                  alt="Happy dog"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 rounded-full p-2">
                    <Dog className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dog Collection</p>
                    <p className="text-sm text-gray-500">50+ products</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 rounded-full p-2">
                    <Cat className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Cat Collection</p>
                    <p className="text-sm text-gray-500">40+ products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Pet Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find everything your furry friend needs in our carefully curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Dog Category */}
            <Link
              to="/dogs"
              className="group relative overflow-hidden rounded-3xl aspect-[16/9] bg-amber-50"
            >
              <img
                  src="https://www.doglinegroup.com/cdn/shop/files/toys_banner_1920x730.jpg?v=1753898068"
                // src="https://images.pexels.com/photos/1629785/pexels-photo-1629785.jpeg?auto=compress&cs=tinysrgb&w=800"
                // src="https://images.unsplash.com/photo-1749703050879-ee1c2eb5d5e9?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxM3x8ZG9nJTIwcHJvZHVjdHxlbnwwfHx8fDE3ODI3MTYxMjh8MA&ixlib=rb-4.1.0&fit=max&q=80"
                alt="Dog products"
                className="absolute right-0 left-0 h-32 w-full object-fill z-5  group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Dog className="w-6 h-6 text-amber-400" />
                  <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
                    Dogs
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-500 mb-2">
                  Dog Products
                </h3>
                <p className="text-gray-400 mb-4 max-w-md">
                  Premium food, toys, beds, and accessories for your loyal companion
                </p>
                <span className="inline-flex items-center gap-2 text-amber-500 font-semibold group-hover:gap-3 transition-all">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* Cat Category */}
            <Link
              to="/cats"
              className="group relative overflow-hidden rounded-3xl aspect-[16/9] bg-orange-50"
            >
              <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpNQhq_8xdyU25UKylWqvcaiaLWLRpphO1Ai4mK5jeAg&s"
                  // src="https://images.unsplash.com/photo-1625141976586-ff3f03d2f4d5?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwyfHxjYXQlMjBwcm9kdWN0fGVufDB8fHx8MTc4MjczNTkzMXww&ixlib=rb-4.1.0&w=400&h=800&fit=max&q=80"
                // src="https://images.pexels.com/photos/1405224/pexels-photo-1405224.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Cat products"
                className="absolute right-0 left-0 z-5 w-full h-32 object-center object-fill group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Cat className="w-6 h-6 text-orange-400" />
                  <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
                    Cats
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-500 mb-2">
                  Cat Products
                </h3>
                <p className="text-gray-400 mb-4 max-w-md">
                  Gourmet food, interactive toys, cozy beds, and litter essentials
                </p>
                <span className="inline-flex items-center gap-2 text-amber-500 font-semibold group-hover:gap-3 transition-all">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">Handpicked favorites for your pets</p>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-amber-600 font-semibold"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-amber-500 font-medium mb-2">Limited Time Offer</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Get 20% Off Your First Order!
              </h2>
              <p className="text-amber-500">
                Use code WELCOME20 at checkout. New customers only.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Best Sellers
              </h2>
              <p className="text-gray-600">Top picks loved by pet parents</p>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dog Categories */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Shop Dog Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dogCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/dogs?category=${category.slug}`}
                  className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="aspect-square rounded-lg bg-gray-100 mb-3 overflow-hidden">
                    <img
                      src={category.image_url || ''}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
                    {category.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          {/* Cat Categories */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Shop Cat Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {catCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/cats?category=${category.slug}`}
                  className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="aspect-square rounded-lg bg-gray-100 mb-3 overflow-hidden">
                    <img
                      src={category.image_url || ''}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
                    {category.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">Real reviews from pet lovers like you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <div
                key={review.id}
                className="bg-stone-50 rounded-2xl p-6 relative"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-amber-200" />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{review.content}</p>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-amber-700 font-semibold text-sm">
                      {review.author_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{review.author_name}</p>
                    {review.verified_purchase && (
                      <p className="text-xs text-green-600">Verified Purchase</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join Our Pet Family
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Subscribe for exclusive offers, pet tips, and new product announcements
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
