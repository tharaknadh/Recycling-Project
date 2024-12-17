import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App'; // Assuming App component is in the same directory

// Create Material-UI theme
const theme = createTheme();

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QWsk0GCAqMShoTQrbURSGBCM8eDdGSFknIAlYT0gU3QvguReV5c0Iv1bgS5wAMtkt7oOROB5o5PiJbyAYdmwAQP00cOhVU3zW'); // Replace with your actual Stripe key

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </ThemeProvider>
  </React.StrictMode>
);
