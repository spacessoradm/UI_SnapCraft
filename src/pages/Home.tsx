import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Image as ImageIcon, Star, Truck, Shield, Clock, Mail, ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 global-font">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-gradient-to-r from-pink-200/90 to-purple-200/90">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596825205490-7263b87acf8b?auto=format&fit=crop&q=80&w=2000"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 font-serif mb-6">
              Transform Your Photos Into Stunning Magnets
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Create personalized magnetic memories that bring your favorite moments to life. Perfect for gifts, decoration, or keeping cherished photos close.
            </p>
            <Link
              to="/product/set-of-6"
              className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Creating
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Why Choose Our Magnets?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
              Experience premium quality and exceptional service with every order
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 mx-auto mb-6">
                <ImageIcon className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                High-resolution printing on premium magnetic material
              </p>
            </div>

            <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 mt-8 md:mt-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mx-auto mb-6">
                <Star className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">Easy to Create</h3>
              <p className="text-gray-600">
                Simple upload and customization process
              </p>
            </div>

            <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mx-auto mb-6">
                <Truck className="h-8 w-8 text-rose-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick production and worldwide delivery
              </p>
            </div>

            <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 mt-8 md:mt-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-violet-100 mx-auto mb-6">
                <Shield className="h-8 w-8 text-violet-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">
                Love your magnets or get your money back
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Our Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
              Choose from our selection of premium photo magnets
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden rounded-t-3xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">RM {product.price}</span>
                    <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-full text-sm font-medium group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-300">
                      Order Now
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Fancy FAQ Section */}
      <div className="py-24 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
              Find answers to common questions about our products and services
            </p>
          </div>
          <div className="space-y-8">
            {[
              {
                question: "How do I upload my photos?",
                answer: "Simply click the 'Start Creating' button and follow the prompts to upload your images."
              },
              {
                question: "What sizes are available?",
                answer: "We offer multiple sizes to fit your needs, ranging from small magnets to larger keepsakes."
              },
              {
                question: "Can I order in bulk?",
                answer: "Yes, we offer discounts for bulk orders. Contact us for more details."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subscribe Newsletter Section */}
      <div className="py-24 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-700 mb-8">
            Subscribe to our newsletter and be the first to know about new products and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-6 py-3 rounded-full shadow-md text-gray-700 text-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-12 py-3 rounded-full text-lg font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-12 text-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50 -rotate-3 transform"></div>
            <div className="relative">
              <Clock className="h-16 w-16 text-gray-800 mx-auto mb-6" />
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">Limited Time Offer</h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Get 20% off your first order when you create your magnets today
              </p>
              <Link
                to="/product/set-of-6"
                className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Creating Now
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}