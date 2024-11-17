import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-pink-50 global-font">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h1>
        <p className="text-gray-500 text-center">Log in to your account</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link to="/reset" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
