import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, ShoppingCart, Menu, Search, UserCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../assets/css/styles.css'; // Import the CSS file

export default function Navbar() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="global-font">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-pink-200 to-purple-200 text-black">
        <div className="max-w-7xl mx-auto promotional-banner">
          <div>Free Delivery for Orders Above RM 250</div>
          <div>5% Discount on All Items</div>
        </div>
      </div>


      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <ImageIcon className="h-8 w-8 text-indigo-600" />
                <span className="text-2xl font-bold text-gray-900">SnapCraft</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/brandstory" className="text-gray-600 hover:text-gray-900">Brand Story</Link>
              <button className="text-gray-600 hover:text-gray-900">
                <Search className="h-6 w-6" />
              </button>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                <UserCircle className="h-6 w-6" />
              </Link>
              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button className="text-gray-600">
                <Search className="h-6 w-6" />
              </button>
              <button className="text-gray-600">
                <UserCircle className="h-6 w-6" />
              </button>
              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="bg-white shadow-lg md:hidden">
            <div className="flex flex-col space-y-4 py-4 px-6">
              <Link to="/brandstory" className="text-gray-600 hover:text-gray-900">
                Brand Story
              </Link>
              <button className="text-gray-600 hover:text-gray-900 flex items-center">
                <Search className="h-6 w-6 mr-2" />
                Search
              </button>
              <button className="text-gray-600 hover:text-gray-900 flex items-center">
                <UserCircle className="h-6 w-6 mr-2" />
                Account
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
