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

//////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField
// } from "@mui/material";
// import Footer from "../components/Footer";
// import Header from "../components/Header";

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]); // To store contact data
//   const [open, setOpen] = useState(false); // For dialog box
//   const [currentContact, setCurrentContact] = useState({}); // Contact being edited
//   const [searchEmail, setSearchEmail] = useState(""); // Email to search

//   // Fetch contacts on component mount
//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get(
//         "https://localhost:7047/api/ContactUS/GetAll"
//       );
//       setContacts(response.data);
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.post("https://localhost:7047/api/ContactUS/Remove", null, {
//         params: { id }
//       });
//       setContacts(contacts.filter((contact) => contact.id !== id));
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//     }
//   };

//   const handleOpenUpdate = (contact) => {
//     setCurrentContact(contact);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentContact({});
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.post(
//         "https://localhost:7047/api/ContactUS/Update",
//         currentContact
//       );
//       fetchContacts(); // Refresh data
//       handleClose();
//     } catch (error) {
//       console.error("Error updating contact:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentContact({ ...currentContact, [name]: value });
//   };

//   const handleSearch = () => {
//     if (searchEmail) {
//       const filteredContacts = contacts.filter((contact) =>
//         contact.email.toLowerCase().includes(searchEmail.toLowerCase())
//       );
//       setContacts(filteredContacts);
//     }
//   };

//   const clearSearch = () => {
//     setSearchEmail("");
//     fetchContacts();
//   };

//   return (
//     <>
//       <Header />
//       <div
//         style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
//       >
//         <div style={{ flex: "1", padding: "20px" }}>
//           <h2>Contact Us Table</h2>

//           <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
//             <TextField
//               label="Search by Email"
//               value={searchEmail}
//               onChange={(e) => setSearchEmail(e.target.value)}
//               style={{ flex: "1" }}
//             />
//             <Button variant="contained" color="primary" onClick={handleSearch}>
//               Search
//             </Button>
//             <Button variant="contained" color="secondary" onClick={clearSearch}>
//               Clear
//             </Button>
//           </div>

//           <table
//             // border="1"
//             style={{ width: "100%", borderCollapse: "collapse" }}
//           >
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Mode of Contact</th>
//                 <th>Reason</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contacts.map((contact) => (
//                 <tr key={contact.id}>
//                   <td>{contact.id}</td>
//                   <td>{contact.name}</td>
//                   <td>{contact.email}</td>
//                   <td>{contact.modeofContract}</td>
//                   <td>{contact.reason}</td>
//                   <td>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleOpenUpdate(contact)}
//                       style={{ marginRight: "10px" }}
//                     >
//                       Update
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => handleDelete(contact.id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Update Dialog */}
//           <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>Update Contact</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Name"
//                 name="name"
//                 value={currentContact.name || ""}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Email"
//                 name="email"
//                 value={currentContact.email || ""}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Mode of Contact"
//                 name="modeofContract"
//                 value={currentContact.modeofContract || ""}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Reason"
//                 name="reason"
//                 value={currentContact.reason || ""}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleClose} color="secondary">
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleUpdate}
//                 color="primary"
//                 variant="contained"
//               >
//                 Update
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </div>
//       </div>

//       <footer
//         style={{
//           backgroundColor: "#f8f9fa",
//           textAlign: "center",
//           padding: "10px",
//           marginTop: "auto"
//         }}
//       >
//         <Footer />
//       </footer>
//     </>
//   );
// };

// export default ContactList;

////////////////////////////////

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import Footer from "../components/Footer";
// import Header from "../components/Header";

// const useStyles = makeStyles({
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "20px"
//   },
//   th: {
//     backgroundColor: "#f5f5f5",
//     color: "#333",
//     fontWeight: "bold",
//     borderBottom: "2px solid #ddd",
//     padding: "8px",
//     textAlign: "left"
//   },
//   td: {
//     borderBottom: "1px solid #ddd",
//     padding: "8px"
//   },
//   rowHover: {
//     "&:hover": {
//       backgroundColor: "#f9f9f9"
//     }
//   },
//   actions: {
//     display: "flex",
//     gap: "10px"
//   }
// });

// const ContactList = () => {
//   const classes = useStyles();
//   const [contacts, setContacts] = useState([]); // To store contact data
//   const [open, setOpen] = useState(false); // For dialog box
//   const [currentContact, setCurrentContact] = useState({}); // Contact being edited
//   const [searchEmail, setSearchEmail] = useState(""); // Email to search

//   // Fetch contacts on component mount
//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get(
//         "https://localhost:7047/api/ContactUS/GetAll"
//       );
//       setContacts(response.data);
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.post("https://localhost:7047/api/ContactUS/Remove", null, {
//         params: { id }
//       });
//       setContacts(contacts.filter((contact) => contact.id !== id));
//     } catch (error) {
//       console.error("Error deleting contact:", error);
//     }
//   };

//   const handleOpenUpdate = (contact) => {
//     setCurrentContact(contact);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentContact({});
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.post(
//         "https://localhost:7047/api/ContactUS/Update",
//         currentContact
//       );
//       fetchContacts(); // Refresh data
//       handleClose();
//     } catch (error) {
//       console.error("Error updating contact:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentContact({ ...currentContact, [name]: value });
//   };

//   const handleSearch = () => {
//     if (searchEmail) {
//       const filteredContacts = contacts.filter((contact) =>
//         contact.email.toLowerCase().includes(searchEmail.toLowerCase())
//       );
//       setContacts(filteredContacts);
//     }
//   };

//   const clearSearch = () => {
//     setSearchEmail("");
//     fetchContacts();
//   };

//   return (
//     <>
//       <Header />
//       <div
//         style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
//       >
//         <div style={{ flex: "1", padding: "20px", marginTop: "50px" }}>
//           <h2>Contact Us Table</h2>

//           <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
//             <TextField
//               label="Search by Email"
//               value={searchEmail}
//               onChange={(e) => setSearchEmail(e.target.value)}
//               style={{ flex: "1" }}
//             />
//             <Button variant="contained" color="primary" onClick={handleSearch}>
//               Search
//             </Button>
//             <Button variant="contained" color="secondary" onClick={clearSearch}>
//               Clear
//             </Button>
//           </div>

//           <table className={classes.table}>
//             <thead>
//               <tr>
//                 <th className={classes.th}>ID</th>
//                 <th className={classes.th}>Name</th>
//                 <th className={classes.th}>Email</th>
//                 <th className={classes.th}>Mode of Contact</th>
//                 <th className={classes.th}>Reason</th>
//                 <th className={classes.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contacts.length > 0 ? (
//                 contacts.map((contact) => (
//                   <tr key={contact.id}>
//                     <td>{contact.id}</td>
//                     <td>{contact.name}</td>
//                     <td>{contact.email}</td>
//                     <td>{contact.modeofContract}</td>
//                     <td>{contact.reason}</td>
//                     <td>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleOpenUpdate(contact)}
//                         style={{ marginRight: "10px" }}
//                       >
//                         Update
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="secondary"
//                         onClick={() => handleDelete(contact.id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     style={{ textAlign: "center", padding: "20px" }}
//                   >
//                     <img
//                       src="https://via.placeholder.com/150" // Replace with your "no data" image URL
//                       alt="No data found"
//                       style={{ marginBottom: "10px", maxWidth: "100px" }}
//                     />
//                     <div>No data found</div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Update Dialog */}
//           <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>Update Contact</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Name"
//                 name="name"
//                 value={currentContact.name || ""}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Email"
//                 name="email"
//                 value={currentContact.email || ""}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Mode of Contact"
//                 name="modeofContract"
//                 value={currentContact.modeofContract || ""}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Reason"
//                 name="reason"
//                 value={currentContact.reason || ""}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleClose} color="secondary">
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleUpdate}
//                 color="primary"
//                 variant="contained"
//               >
//                 Update
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </div>
//       </div>

//       <footer
//         style={{
//           backgroundColor: "#f8f9fa",
//           textAlign: "center",
//           padding: "10px",
//           marginTop: "auto"
//         }}
//       >
//         <Footer />
//       </footer>
//     </>
//   );
// };

// export default ContactList;

///////////////////////////////

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tooltip,
  IconButton
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Edit, Delete } from "@mui/icons-material"; // Icons for actions
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const useStyles = makeStyles({
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden"
  },
  th: {
    backgroundColor: "#f5f5f5",
    color: "#333",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
    padding: "12px 8px",
    textAlign: "left",
    position: "sticky",
    top: "0",
    zIndex: 2
  },
  td: {
    padding: "12px 8px",
    borderBottom: "1px solid #ddd",
    color: "#555"
  },
  rowHover: {
    "&:hover": {
      backgroundColor: "#f9f9f9",
      transition: "background-color 0.3s ease"
    }
  },
  actionIcons: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center"
  },
  iconButton: {
    color: "#333",
    "&:hover": {
      color: "#1976d2",
      transform: "scale(1.1)",
      transition: "color 0.3s ease, transform 0.3s ease"
    }
  }
});

const ContactList = () => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const [searchEmail, setSearchEmail] = useState("");

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
      fetchContacts();
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
        <div style={{ flex: "1", padding: "20px", marginTop: "50px" }}>
          <h2>Reached out Customers</h2>

          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
            <TextField
              label="Search by Email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              style={{ flex: "1" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
            >
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearSearch}
              startIcon={<ClearIcon />}
            >
            </Button>
          </div>

          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.th}>ID</th>
                <th className={classes.th}>Name</th>
                <th className={classes.th}>Email</th>
                <th className={classes.th}>Mode of Contact</th>
                <th className={classes.th}>Reason</th>
                <th className={classes.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact.id} className={classes.rowHover}>
                    <td className={classes.td}>{contact.id}</td>
                    <td className={classes.td}>{contact.name}</td>
                    <td className={classes.td}>{contact.email}</td>
                    <td className={classes.td}>{contact.modeofContract}</td>
                    <td className={classes.td}>{contact.reason}</td>
                    <td className={classes.actionIcons}>
                      <Tooltip title="Edit">
                        <IconButton
                          className={classes.iconButton}
                          onClick={() => handleOpenUpdate(contact)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          className={classes.iconButton}
                          onClick={() => handleDelete(contact.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    <img
                      src="https://via.placeholder.com/150"
                      alt="No data found"
                      style={{ marginBottom: "10px", maxWidth: "100px" }}
                    />
                    <div>No data found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

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
        <Footer />
      </footer>
    </>
  );
};

export default ContactList;
