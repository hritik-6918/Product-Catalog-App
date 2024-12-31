import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { ProductDetails } from './pages/ProductDetails';
import { ProductForm } from './components/ProductForm';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <nav className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  Product Catalog
                </Link>
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <Link
                    to="/products/new"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={20} />
                    <span>Add Product</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/new" element={
              <div className="container mx-auto px-4 py-8 max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">Add New Product</h2>
                <ProductForm onSubmit={() => window.location.href = '/'} />
              </div>
            } />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;