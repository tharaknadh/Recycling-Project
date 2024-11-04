// import React, { useState } from 'react';
// import '../css/Login.css'; // Assuming you have a separate CSS file
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useNavigate } from 'react-router-dom';

// function ContactUs() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     description: ''
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     email: false
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const isNameValid = formData.name.trim() !== '';
//     const isEmailValid = validateEmail(formData.email);

//     setErrors({
//       name: !isNameValid,
//       email: !isEmailValid
//     });

//     if (isNameValid && isEmailValid) {
//       // Handle successful form submission
//       console.log('Form submitted:', formData);
//       alert('Thank you for contacting us!');
//       // Clear the form
//       navigate('/home'); 
//       setFormData({ name: '', email: '', description: '' });
//     }
//   };

//   return (
//     <div>
//       <Header/>
//       <div className="login-container">
//       <div className='login'>
//       <h2>Contact Us</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name*
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className={errors.name ? 'error' : ''}
//             required
//           />
//         </label>
//         {errors.name && <span className="error-message">Please enter your name.</span>}

//         <label>
//           Email*
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={errors.email ? 'error' : ''}
//             required
//           />
//         </label>
//         {errors.email && <span className="error-message">Please enter a valid email.</span>}

//         <label>
//           Description:
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="4"
//           />
//         </label>

//         <button type="submit">Submit</button>
//       </form>
//       </div>
//       </div>
//       <Footer/>
//     </div>
    
//   );
// }

// export default ContactUs;

// src/components/ContactUs.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { firestore } from '../service/firebase'; // Import your Firestore instance
import { collection, addDoc } from 'firebase/firestore';
import { getDocs, query } from 'firebase/firestore';

const ContactUs = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modeOfContact, setModeOfContact] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      name,
      email,
      modeOfContact,
      timestamp: new Date(),
    };
    try {
      await addDoc(collection(firestore, 'ContactUs'), contactData);
      setName('');
      setEmail('');
      setModeOfContact('');
      onClose();
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Contact Us</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Mode of Contact"
            variant="outlined"
            fullWidth
            margin="normal"
            value={modeOfContact}
            onChange={(e) => setModeOfContact(e.target.value)}
            required
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUs;

