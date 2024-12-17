// import React from 'react'
// import { useState } from 'react';
// import "../css/Donation.css";
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// function Donation() {
//     const [donationAmount, setDonationAmount] = useState('');
//   const [donationMessage, setDonationMessage] = useState('');
//   const handleDonation = (amount) => {
//     setDonationAmount(amount);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (donationAmount) {
//       setDonationMessage(`Thank you for your valuable donation of £${donationAmount}!`);
//       setDonationAmount(''); 
//     } else {
//       setDonationMessage('Please enter or select an amount for Donation.');
//     }
//   };
//   return (
//     <>
//     <Header/>
//     <div className="donation-container" style={{height:"100vh"}}>
//     <h2>Support Plastic Recycling</h2>
//     <p>Your donations help fund plastic recycling initiatives, community clean-ups, and awareness campaigns. Every contribution makes a difference!</p>
    
//     <form onSubmit={handleSubmit} className="donation-form">
//       <label htmlFor="donation-amount">Enter Donation Amount (£):</label>
//       <input
//         type="number"
//         id="donation-amount"
//         value={donationAmount}
//         onChange={(e) => setDonationAmount(e.target.value)}
//         placeholder="e.g., 10, 20"
//       />

//       <div className="preset-buttons">
//         {[5, 10, 20, 50].map((amount) => (
//           <button
//             type="button"
//             key={amount}
//             onClick={() => handleDonation(amount)}
//             className="preset-button"
//           >
//             £{amount}
//           </button>
//         ))}
//       </div>

//       <button type="submit" className="submit-button">Donate</button>
//     </form>

//     {donationMessage && <p className="donation-message">{donationMessage}</p>}
//   </div>
//     <Footer/>
//     </>
   
//   );
// }

// export default Donation


import React, { useState } from 'react';
import "../css/Donation.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';

function Donation() {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleDonation = (amount) => {
    setDonationAmount(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!donationAmount) {
      setDonationMessage('Please enter or select an amount for Donation.');
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvc = elements.getElement(CardCvcElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumber,
    });

    if (error) {
      setLoading(false);
      setDonationMessage(error.message);
    } else {
      // const paymentIntent = await fetch('your-backend-api', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     paymentMethodId: paymentMethod.id,
      //     amount: donationAmount , 
      //   }),
      // }).then(res => res.json());
      setLoading(false);
      setDonationMessage(`Thank you for your valuable donation of £${donationAmount}!`);
      // if (paymentIntent.error) {
      //   setLoading(false);
      //   setDonationMessage(paymentIntent.error);
      //   setDonationMessage(`Thank you for your valuable donation of £${donationAmount}!`);
      // } else {
      //   setLoading(false);
      //   setDonationMessage(`Thank you for your valuable donation of £${donationAmount}!`);
      //   setDonationAmount('');
      // }
    }
  };

  return (
    <>
      <Header />
      <div className="donation-container" style={{ height: "100vh" }}>
        <h2>Support Plastic Recycling</h2>
        <p>Your donations help fund plastic recycling initiatives, community clean-ups, and awareness campaigns. Every contribution makes a difference!</p>

        <form onSubmit={handleSubmit} className="donation-form">
          <label htmlFor="donation-amount">Enter Donation Amount (£):</label>
          <input
            type="number"
            id="donation-amount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="e.g., 10, 20"
          />

          <div className="preset-buttons">
            {[5, 10, 20, 50].map((amount) => (
              <button
                type="button"
                key={amount}
                onClick={() => handleDonation(amount)}
                className="preset-button"
              >
                £{amount}
              </button>
            ))}
          </div>

          <div className="card-details">
            <div className="card-element-container">
              <label htmlFor="card-number">Card Number:</label>
              <CardNumberElement id="card-number" />
            </div>

            <div className="card-element-container">
              <label htmlFor="card-expiry">Expiry Date:</label>
              <CardExpiryElement id="card-expiry" />
            </div>

            <div className="card-element-container">
              <label htmlFor="card-cvc">CVC:</label>
              <CardCvcElement id="card-cvc" />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={loading || !donationAmount}>
            {loading ? 'Processing...' : 'Donate'}
          </button>
        </form>

        {donationMessage && <p className={`donation-message ${donationMessage.includes('Thank') ? 'success' : 'error'}`}>{donationMessage}</p>}
      </div>
      <Footer />
    </>
  );
}

export default Donation;
