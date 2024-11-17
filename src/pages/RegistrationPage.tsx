import React from 'react';
import { Link } from 'react-router-dom';

export default function RegistrationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-pink-50 global-font">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Create Your Account</h1>
        <p className="text-gray-500 text-center">Sign up to get started</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-600 hover:text-teal-500">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
