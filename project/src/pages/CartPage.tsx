import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../lib/cart';

export default function CartPage() {
  const { items, loading, totalItems, subtotal, updateQuantity, removeFromCart } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-md">
          <div className="bg-amber-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products yet. Start shopping to fill your cart with
            goodies for your furry friends!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm p-4 md:p-6 flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to={`/product/${item.product.slug}`}
                  className="flex-shrink-0 w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100"
                >
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="flex-1">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="font-medium text-gray-900 hover:text-amber-600 transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.product.pet_type === 'dog' ? 'Dog' : 'Cat'} Product
                  </p>
                  <div className="mt-2 font-bold text-lg text-gray-900">
                    ${item.product.price.toFixed(2)}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                {subtotal < 50 && (
                  <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded-lg">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                  />
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/shop"
                className="block text-center text-amber-600 font-medium mt-4 hover:text-amber-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
