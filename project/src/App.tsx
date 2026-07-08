import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './lib/cart';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/dogs" element={<ShopPage petType="dog" title="Dog Products" description="Premium supplies for your loyal companion" />} />
            <Route path="/cats" element={<ShopPage petType="cat" title="Cat Products" description="Everything your feline friend needs" />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
