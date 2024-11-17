import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      setMessage(
        'If an account with this email exists, we have sent a password reset link.'
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-pink-50 global-font">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        {message ? (
          <div className="text-green-600 text-center mb-4">{message}</div>
        ) : (
          <>
            <p className="text-gray-600 text-center mb-6">
              Enter your email address and we will send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        )}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-indigo-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
