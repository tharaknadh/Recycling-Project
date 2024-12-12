import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";
import apiRequest, { getApiRequest } from "../utilities/ApiRequest";
import Footer from "../components/Footer";
import Header from "../components/Header";

function AllUsers() {
  const [users, setUsers] = useState([
    {
      id: 5,
      name: "Madhu",
      email: "test@gmail.com",
      encryption: "gCNGRn1W0MERaTCQjbifgQ==",
      password: "test@123",
      confirmPassword: "test@123",
      role: "User"
    },
    {
      id: 6,
      name: "test",
      email: "test@gmail.com",
      encryption: "j3iQKb5/3HLIb8p7tc8QLA==",
      password: "okok",
      confirmPassword: "okok",
      role: "User"
    },
    {
      id: 7,
      name: "role",
      email: "role@gmail.com",
      encryption: "j3iQKb5/3HLIb8p7tc8QLA==",
      password: "okok",
      confirmPassword: "okok",
      role: "Admin"
    },
    {
      id: 8,
      name: "email",
      email: "Madhu@gmail.com",
      encryption: "j3iQKb5/3HLIb8p7tc8QLA==",
      password: "okok",
      confirmPassword: "okok",
      role: "Admin"
    },
    {
      id: 9,
      name: "string",
      email: "string",
      encryption: "Z9G/YRsXA/g2TBSXr3XWfA==",
      password: "string",
      confirmPassword: "string",
      role: "string"
    },
    {
      id: 10,
      name: "string",
      email: "string",
      encryption: "Z9G/YRsXA/g2TBSXr3XWfA==",
      password: "string",
      confirmPassword: "string",
      role: "string"
    },
    {
      id: 11,
      name: "string",
      email: "string",
      encryption: "Z9G/YRsXA/g2TBSXr3XWfA==",
      password: "string",
      confirmPassword: "string",
      role: "string"
    },
    {
      id: 12,
      name: "TARAK",
      email: "Madhu@gmail.com",
      encryption: "j3iQKb5/3HLIb8p7tc8QLA==",
      password: "okok",
      confirmPassword: "okok",
      role: "User"
    }
  ]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for the update modal
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await getApiRequest("/api/Users/GetUsers", "GET");
      setUsers(response);
      setFilteredUsers(response); // Initialize filtered users
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseTerm) ||
          user.email.toLowerCase().includes(lowerCaseTerm)
      )
    );
  }, [searchTerm, users]);

  // Open update modal
  const handleUpdateClick = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  // Close update modal
  const handleClose = () => {
    setOpen(false);
    setCurrentUser(null);
  };

  // Update API call
  const handleUpdate = async () => {
    try {
      await apiRequest(`/api/Users/Update`, "POST", currentUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === currentUser.id ? currentUser : user
        )
      );
      setOpen(false);
    } catch (err) {
      alert("Failed to update user: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest(`/api/Users/Delete`, "POST");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user: " + err.message);
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: "16px" }}>
        <Typography variant="h6" gutterBottom>
          Search Users
        </Typography>
        <TextField
          fullWidth
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          margin="normal"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleUpdateClick(user)}
                      style={{ marginRight: "10px" }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {!loading && filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />

      {/* Update Modal */}
      {currentUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update User</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Name"
              value={currentUser.name}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              value={currentUser.email}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="dense"
              label="Role"
              value={currentUser.password}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, password: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default AllUsers;
