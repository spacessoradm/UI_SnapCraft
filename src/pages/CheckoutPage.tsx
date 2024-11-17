import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { DeliveryDetails } from '../types';
import { products } from '../data/products';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import '../assets/css/checkout.css';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [details, setDetails] = useState<DeliveryDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        console.error(error);
        return;
      }

      // Send the token and delivery details to the backend for payment processing
      const response = await fetch('/api/payment-intent', {
        method: 'POST',
        body: JSON.stringify({
          token: token.id,
          deliveryDetails: details,
          totalAmount: total * 100, // Convert to cents
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        navigate('/success'); // Redirect to success page
      } else {
        console.error(data.message);
      }
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-rose-50 to-pink-50 global-font">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                value={details.fullName}
                onChange={e => setDetails(prev => ({ ...prev, fullName: e.target.value }))}
                className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={details.email}
                onChange={e => setDetails(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                required
                value={details.phone}
                onChange={e => setDetails(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                required
                value={details.address}
                onChange={e => setDetails(prev => ({ ...prev, address: e.target.value }))}
                className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  required
                  value={details.city}
                  onChange={e => setDetails(prev => ({ ...prev, city: e.target.value }))}
                  className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  type="text"
                  required
                  value={details.postalCode}
                  onChange={e => setDetails(prev => ({ ...prev, postalCode: e.target.value }))}
                  className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                required
                value={details.country}
                onChange={e => setDetails(prev => ({ ...prev, country: e.target.value }))}
                className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <h3 className="text-xl font-semibold mt-6">Payment Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Details</label>
              <CardElement
                className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit" disabled={!stripe} 
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Complete Order (${total.toFixed(2)})
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 py-4 border-b last:border-0">
                {item.images[0] && (
                  <img
                    src={item.images[0]}
                    alt="Product preview"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {item.quantity}x {products.find(p => p.id === item.productId)?.name}
                  </p>
                  <p className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}