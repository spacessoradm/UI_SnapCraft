import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App.tsx';
import './index.css';

// Load Stripe with your public key
const stripePromise = loadStripe('your-stripe-public-key'); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>
);
