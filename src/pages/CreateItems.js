import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import apiRequest from "../utilities/ApiRequest";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CreateItems() {
  // Form state
  const [formData, setFormData] = useState({
    recycleName: "",
    description: "",
    productStatus: "",
    imagesUrl: "",
    recycleDate: "",
    recycleLocation: "",
    recycleType: ""
  });

  // Submitted data state
  const [submittedData, setSubmittedData] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest(
        "/api/ItemDetails/Create",
        "POST",
        formData
      );
      setSubmittedData((prev) => [...prev, response]); // Assuming API returns the created item
      setFormData({
        recycleName: "",
        description: "",
        productStatus: "Pending",
        imagesUrl: "",
        recycleDate: "",
        recycleLocation: "",
        recycleType: ""
      });
    } catch (error) {
      alert("Error submitting form: " + (error.message || "Unknown error"));
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 4 }}>
        <Paper sx={{ padding: 3, marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Create Item Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Recycle Name"
              name="recycleName"
              fullWidth
              margin="normal"
              value={formData.recycleName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <TextField
              label="Images URL"
              name="imagesUrl"
              fullWidth
              margin="normal"
              value={formData.imagesUrl}
              onChange={handleChange}
            />
            <TextField
              label="Recycle Date"
              name="recycleDate"
              type="date"
              fullWidth
              margin="normal"
              value={formData.recycleDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Recycle Location"
              name="recycleLocation"
              fullWidth
              margin="normal"
              value={formData.recycleLocation}
              onChange={handleChange}
              required
            />
            <TextField
              label="Recycle Type"
              name="recycleType"
              fullWidth
              margin="normal"
              value={formData.recycleType}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Paper>
        {/* <Paper sx={{ padding: 3 }}> */}
        {/* <Typography variant="h6" gutterBottom>
            Submitted Data
          </Typography> */}
        {/* {submittedData.length > 0 ? (
            <List>
              {submittedData.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Recycle Name: ${item.recycleName}`}
                    secondary={`Description: ${item.description}, Product Status: ${item.productStatus}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No data submitted yet.</Typography>
          )} */}
        {/* </Paper> */}
      </Box>
      <Footer />
    </>
  );
}

export default CreateItems;
