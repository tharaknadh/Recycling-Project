import React, { useEffect, useState } from 'react';
import { firestore } from '../service/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Material-UI imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getApiRequest } from '../utilities/ApiRequest';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchContacts() {
    const contactsCollection = collection(firestore, 'ContactUs');
    const querySnapshot = await getDocs(contactsCollection);

    const contacts = [];
    querySnapshot.forEach((doc) => {
      const contactData = doc.data();
      contacts.push({ id: doc.id, ...contactData });
    });

    return contacts;
  }


  const fetchUsers = async () => {
    console.log("Madhu1");
    try {
      console.log("Madhu3");
      const response = await getApiRequest('/api/ContactUS',"GET");
      console.log("Madhu2",response); 
      // setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchContactsData = async () => {
      const fetchedContacts = await fetchContacts();
      setContacts(fetchedContacts);
    };

    fetchContactsData();
  }, []);

  return (
    <> 
    <Header/>
    <TableContainer component={Paper} style={{ marginTop: '20px', padding: '16px' ,height:"100vh"}}>
      <Typography variant="h6" align="center" gutterBottom>
        Contact List
      </Typography>
      <Table aria-label="contact table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Mode of Contact</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.modeOfContact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Footer/>
    </>
   
  );
}
