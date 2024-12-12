// import React, { useEffect, useState } from 'react';
// import { firestore } from '../service/firebase';
// import { collection, getDocs } from 'firebase/firestore';

// // Material-UI imports
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
// } from '@mui/material';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { getApiRequest } from '../utilities/ApiRequest';
// import { getContactUS } from '../utilities/commonApis';

// export default function ContactList() {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // async function fetchContacts() {
//   //   const contactsCollection = collection(firestore, 'ContactUs');
//   //   const querySnapshot = await getDocs(contactsCollection);

//   //   const contacts = [];
//   //   querySnapshot.forEach((doc) => {
//   //     const contactData = doc.data();
//   //     contacts.push({ id: doc.id, ...contactData });
//   //   });

//   //   return contacts;
//   // }

//   const fetchUsers = async () => {
//     console.log("Madhu1");
//     try {
//       console.log("Madhu3");
//       const response = await getApiRequest(getContactUS,"GET");
//       console.log("Madhu2",response);
//       // setUsers(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error fetching users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // useEffect(() => {
//   //   const fetchContactsData = async () => {
//   //     const fetchedContacts = await fetchContacts();
//   //     setContacts(fetchedContacts);
//   //   };

//   //   fetchContactsData();
//   // }, []);

//   return (
//     <>
//     <Header/>
//     <TableContainer component={Paper} style={{ marginTop: '20px', padding: '16px' ,height:"100vh"}}>
//       <Typography variant="h6" align="center" gutterBottom>
//         Contact List
//       </Typography>
//       <Table aria-label="contact table">
//         <TableHead>
//           <TableRow>
//             <TableCell><strong>Name</strong></TableCell>
//             <TableCell><strong>Email</strong></TableCell>
//             <TableCell><strong>Mode of Contact</strong></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {contacts.map((contact) => (
//             <TableRow key={contact.id}>
//               <TableCell>{contact.name}</TableCell>
//               <TableCell>{contact.email}</TableCell>
//               <TableCell>{contact.modeOfContact}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     <Footer/>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ContactUsTable = () => {
  const [contacts, setContacts] = useState([]); // To store contact data
  const [open, setOpen] = useState(false); // For dialog box
  const [currentContact, setCurrentContact] = useState({}); // Contact being edited
  const [searchEmail, setSearchEmail] = useState(""); // Email to search

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7047/api/ContactUS/GetAll"
      );
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("https://localhost:7047/api/ContactUS/Remove", null, {
        params: { id }
      });
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleOpenUpdate = (contact) => {
    setCurrentContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentContact({});
  };

  const handleUpdate = async () => {
    try {
      await axios.post(
        "https://localhost:7047/api/ContactUS/Update",
        currentContact
      );
      fetchContacts(); // Refresh data
      handleClose();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact({ ...currentContact, [name]: value });
  };

  const handleSearch = () => {
    if (searchEmail) {
      const filteredContacts = contacts.filter((contact) =>
        contact.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
      setContacts(filteredContacts);
    }
  };

  const clearSearch = () => {
    setSearchEmail("");
    fetchContacts();
  };

  return (
    <>
      <Header />
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ flex: "1", padding: "20px" }}>
          <h2>Contact Us Table</h2>

          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
            <TextField
              label="Search by Email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              style={{ flex: "1" }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
            <Button variant="contained" color="secondary" onClick={clearSearch}>
              Clear
            </Button>
          </div>

          <table
            // border="1"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mode of Contact</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.modeofContract}</td>
                  <td>{contact.reason}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenUpdate(contact)}
                      style={{ marginRight: "10px" }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Update Dialog */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Contact</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                name="name"
                value={currentContact.name || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={currentContact.email || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mode of Contact"
                name="modeofContract"
                value={currentContact.modeofContract || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Reason"
                name="reason"
                value={currentContact.reason || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                color="primary"
                variant="contained"
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

        <footer
          style={{
            backgroundColor: "#f8f9fa",
            textAlign: "center",
            padding: "10px",
            marginTop: "auto"
          }}
        >
          {/* <p>&copy; 2024 Contact Us Management</p> */}
          <Footer />
        </footer>
    </>
  );
};

export default ContactUsTable;
