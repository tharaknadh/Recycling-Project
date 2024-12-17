import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { firestore } from '../service/firebase'; // Import your Firestore instance
import { collection, addDoc } from 'firebase/firestore';
import { getDocs, query } from 'firebase/firestore';
import apiRequest from '../utilities/ApiRequest';
import { createContactUS } from '../utilities/commonApis';

const Contactus = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modeOfContact, setModeOfContact] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      name,
      email,
      ModeofContract: modeOfContact,
      // timestamp: new Date(),
      reason
    };
    try {
      // await addDoc(collection(firestore, 'ContactUs'), contactData);
      const response1 = await apiRequest(createContactUS, 'POST', contactData);
      if(response1){
        setName('');
        setEmail('');
        setModeOfContact('');
        setReason('');
        onClose();
      }
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
            label="Contact Source"
            variant="outlined"
            fullWidth
            margin="normal"
            value={modeOfContact}
            onChange={(e) => setModeOfContact(e.target.value)}
            required
          />
          <TextField
            label="Reason"
            variant="outlined"
            fullWidth
            margin="normal"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
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

export default Contactus;

