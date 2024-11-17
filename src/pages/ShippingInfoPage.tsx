import React from 'react';

const ShippingInfoPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-pink-50 global-font">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Shipping Information</h1>
        <p className="text-gray-600">
          We ship to various locations across the country. Below are the details of our shipping
          policy:
        </p>
        <ul className="list-disc pl-5 mt-4 text-gray-600">
          <li>
            <strong>Processing Time:</strong> Orders are processed within 1-3 business days.
          </li>
          <li>
            <strong>Shipping Rates:</strong> Calculated at checkout based on your location and
            the size of your order.
          </li>
          <li>
            <strong>Delivery Time:</strong> Expected delivery is 3-7 business days after your
            order is shipped.
          </li>
        </ul>
        <p className="mt-4 text-gray-600">
          For any shipping-related questions, feel free to contact us at{' '}
          <a href="mailto:snapcraft@gmail.com" className="text-blue-500 underline">
            snapcraft@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default ShippingInfoPage;
