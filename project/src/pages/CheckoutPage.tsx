import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '../lib/cart';
import { supabase } from '../lib/supabase';

export default function CheckoutPage() {
  const { items, subtotal, clearCart, sessionId } = useCart();
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    notes: '',
  });

  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: newOrderNumber,
          session_id: sessionId,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          address: formData.address,
          apartment: formData.apartment || null,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          phone: formData.phone || null,
          subtotal,
          shipping,
          total,
          notes: formData.notes || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product.name,
        product_image: item.product.image_url,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

      if (itemsError) throw itemsError;

      await clearCart();
      setOrderNumber(newOrderNumber);
      setOrderComplete(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-md">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-gray-500 mb-6">Order number: {orderNumber}</p>
          <p className="text-sm text-gray-500 mb-8">
            We've sent a confirmation email to {formData.email}
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Cart
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Steps */}
              <div className="flex border-b">
                <button
                  onClick={() => setStep('info')}
                  className={`flex-1 py-4 text-center font-medium transition-colors ${
                    step === 'info' ? 'text-amber-600 bg-amber-50' : 'text-gray-500'
                  }`}
                >
                  <span className="hidden sm:inline">1. </span>
                  Shipping Information
                </button>
                <button
                  onClick={() => formData.firstName && setStep('payment')}
                  disabled={!formData.firstName}
                  className={`flex-1 py-4 text-center font-medium transition-colors ${
                    step === 'payment' ? 'text-amber-600 bg-amber-50' : 'text-gray-500'
                  } disabled:opacity-50`}
                >
                  <span className="hidden sm:inline">2. </span>
                  Payment
                </button>
              </div>

              <div className="p-6 lg:p-8">
                {step === 'info' ? (
                  <form onSubmit={handleSubmitInfo} className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4">
                        Contact Information
                      </h2>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4">
                        Shipping Address
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Apartment, suite, etc. (optional)
                          </label>
                          <input
                            type="text"
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone (optional)
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order Notes (optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none resize-none"
                        placeholder="Any special instructions for your order..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
                    >
                      Continue to Payment
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
                      <div className="bg-stone-50 rounded-xl p-4 border-2 border-amber-400">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked
                            readOnly
                            className="text-amber-500"
                          />
                          <CreditCard className="w-5 h-5 text-gray-700" />
                          <span className="font-medium">Credit Card</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="Name on card"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                        />
                      </div>
                    </div>

                    {/* Shipping address summary */}
                    <div className="bg-stone-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Shipping Address</span>
                        <button
                          type="button"
                          onClick={() => setStep('info')}
                          className="text-sm text-amber-600 hover:text-amber-700"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        {formData.apartment && `, ${formData.apartment}`}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </button>

                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        Secure checkout
                      </span>
                      <span className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Free shipping over $50
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
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
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
