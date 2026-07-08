import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Dog, Cat, PawPrint, Phone, Mail, MapPin } from 'lucide-react';
import { useCart } from '../lib/cart';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/dogs', label: 'Dog Products', icon: Dog },
    { path: '/cats', label: 'Cat Products', icon: Cat },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Top bar */}
      <div className="bg-amber-700 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              (555) 123-4567
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="w-3 h-3" />
              hello@petshopeli.com
            </span>
          </div>
          <span className="hidden md:block">Free shipping on orders over $50!</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-2 group-hover:scale-105 transition-transform">
                <PawPrint className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl md:text-2xl text-gray-900 tracking-tight">
                  Pet Shop
                </span>
                <span className="text-xs md:text-sm font-medium text-amber-600 -mt-1">ELI</span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-500 hover:text-amber-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/cart"
                className="relative p-2 text-gray-500 hover:text-amber-600 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-500 hover:text-amber-600 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-amber-50 text-amber-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-2">
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white">Pet Shop</span>
                  <span className="text-xs font-medium text-amber-400 -mt-1">ELI</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Your trusted neighborhood pet store. Premium products for your furry friends since
                2015.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Twitter
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/shop" className="text-sm hover:text-amber-400 transition-colors">
                    Shop All
                  </Link>
                </li>
                <li>
                  <Link to="/dogs" className="text-sm hover:text-amber-400 transition-colors">
                    Dog Products
                  </Link>
                </li>
                <li>
                  <Link to="/cats" className="text-sm hover:text-amber-400 transition-colors">
                    Cat Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm hover:text-amber-400 transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer service */}
            <div>
              <h3 className="font-semibold text-white mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="text-sm hover:text-amber-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-amber-400 transition-colors">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-amber-400 transition-colors">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-amber-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="font-semibold text-white mb-4">Visit Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" />
                  <span>123 Pet Street, Pawsville, CA 90210</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>hello@petshopeli.com</span>
                </li>
              </ul>
              <div className="mt-4">
                <p className="text-sm text-gray-400">Open Mon-Sat: 9am - 7pm</p>
                <p className="text-sm text-gray-400">Sunday: 10am - 5pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Pet Shop Eli. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
