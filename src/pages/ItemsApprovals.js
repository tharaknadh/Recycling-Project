import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import apiRequest from "../utilities/ApiRequest"; // Assuming a utility for API requests
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getItemDetails, removeItemDetails, updateItemDetails } from "../utilities/commonApis";

function CreateItemForm() {
  // Data state
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiRequest(getItemDetails, "GET");
      setSubmittedData(response); // Assuming response is an array of items
    } catch (error) {
      alert("Error fetching data: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  // Handle Approve action
  const handleApprove = async (item) => {
    try {
      await apiRequest(updateItemDetails, "POST", {
        ...item,
        productStatus: "Approved"
      });
      fetchData(); // Refresh data after update
    } catch (error) {
      alert("Error approving item: " + (error.message || "Unknown error"));
    }
  };

  const handleReject = async (item) => {
    try {
      await apiRequest(updateItemDetails, "POST", {
        ...item,
        productStatus: "Rejected"
      });
      fetchData(); // Refresh data after update
    } catch (error) {
      alert("Error approving item: " + (error.message || "Unknown error"));
    }
  };

  // Handle Reject action
  const handleDelete = async (id) => {
    try {
      await apiRequest(`${removeItemDetails}?id=${id}`, "POST");
      fetchData(); // Refresh data after removal
    } catch (error) {
      alert("Error rejecting item: " + (error.message || "Unknown error"));
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 4 }}>
        {/* Table for displaying submitted data */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Submitted Data
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : submittedData.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Recycle Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Product Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submittedData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.recycleName}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.recycleDate}</TableCell>
                      <TableCell>{item.recycleLocation}</TableCell>
                      <TableCell>{item.productStatus}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleApprove(item)}
                          sx={{ marginRight: 1 }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => handleReject(item)}
                          sx={{ marginRight: 1 }}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No data available.</Typography>
          )}
        </Paper>
      </Box>
      <Footer />
    </>
  );
}

export default CreateItemForm;
