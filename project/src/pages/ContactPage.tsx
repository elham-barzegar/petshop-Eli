import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Check } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help! Reach out with any questions about our products, orders, or
            just to say hello.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-amber-600 font-medium hover:text-amber-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                      >
                        <option value="">Select a topic</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="returns">Returns & Exchanges</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-amber-700 px-6 py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have a question about our products or your order? We're here to help! Our
                  friendly team is dedicated to providing excellent customer service.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 rounded-xl p-3 flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">hello@petshopeli.com</p>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 rounded-xl p-3 flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Sat: 9am - 7pm, Sun: 10am - 5pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-rose-100 rounded-xl p-3 flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Live Chat</h3>
                    <p className="text-gray-600">Available on our website</p>
                    <p className="text-sm text-gray-500">Mon-Fri: 9am - 6pm PST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 rounded-xl p-3 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Visit Our Store</h3>
                    <p className="text-gray-600">123 Pet Street</p>
                    <p className="text-gray-600">Pawsville, CA 90210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 rounded-xl p-3 flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Store Hours</h3>
                    <p className="text-gray-600">Mon - Sat: 9am - 7pm</p>
                    <p className="text-gray-600">Sunday: 10am - 5pm</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-64">
                <img
                  src="https://images.pexels.com/photos/1405224/pexels-photo-1405224.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Store location"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What is your return policy?',
                a: 'We offer a 30-day return policy for unopened products. If you or your pet are not satisfied with a product, please contact us and we will work with you to make it right.',
              },
              {
                q: 'Do you offer free shipping?',
                a: 'Yes! We offer free standard shipping on all orders over $50. Orders under $50 have a flat shipping rate of $4.99.',
              },
              {
                q: 'How long does shipping take?',
                a: 'Standard shipping typically takes 3-5 business days. We also offer expedited shipping options at checkout for faster delivery.',
              },
              {
                q: 'Can I bring my pet to the store?',
                a: 'Absolutely! Leashed pets are always welcome in our store. We love meeting our customers furry friends!',
              },
              {
                q: 'Do you have a loyalty program?',
                a: 'Yes! Join our Pet Family rewards program and earn points on every purchase. Points can be redeemed for discounts on future orders.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-stone-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
