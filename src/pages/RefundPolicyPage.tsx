import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 text-center bg-gradient-to-b from-rose-50 to-pink-50 global-font">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Refund and Return Policy</h1>

        <p className="text-gray-700">
          We have a <strong>10-day return policy</strong>, which means you have 10 days after receiving your item to request a return.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Eligibility for Returns</h2>
          <ul className="list-disc mx-auto inline-block text-gray-700 text-left">
            <li>The item must be in the same condition that you received it.</li>
            <li>Unworn or unused, with tags, and in its original packaging.</li>
            <li>You’ll also need the receipt or proof of purchase.</li>
          </ul>
          <p className="text-gray-700">
            To start a return, please contact us at{' '}
            <a
              href="mailto:snapcraft@gmail.com"
              className="text-indigo-600 hover:underline"
            >
              snapcraft@gmail.com
            </a>.
          </p>
          <p className="text-gray-700">
            If your return is accepted, we’ll contact you and provide instructions on how and where to send your package. <strong>Items sent back to us without first requesting a return will not be accepted.</strong>
          </p>
          <p className="text-gray-700">
            You can always contact us for any return questions at{' '}
            <a
              href="mailto:snapcraft@gmail.com"
              className="text-indigo-600 hover:underline"
            >
              snapcraft@gmail.com
            </a>.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Damages and Issues</h2>
          <p className="text-gray-700">
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you received the wrong item, so we can evaluate the issue and make it right.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Exceptions / Non-Returnable Items</h2>
          <p className="text-gray-700">
            Unfortunately, we cannot accept returns on sale items.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Exchanges</h2>
          <p className="text-gray-700">
            The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Refunds</h2>
          <p className="text-gray-700">
            We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days.
          </p>
          <p className="text-gray-700">
            Please remember it can take some time for your bank or credit card company to process and post the refund too.
          </p>
          <p className="text-gray-700">
            If more than 15 business days have passed since we’ve approved your return, please contact us at{' '}
            <a
              href="mailto:snapcraft@gmail.com"
              className="text-indigo-600 hover:underline"
            >
              snapcraft@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
