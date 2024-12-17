// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Paper,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow
// } from "@mui/material";
// import apiRequest from "../utilities/ApiRequest"; // Assuming a utility for API requests
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { getItemDetails, removeItemDetails, updateItemDetails } from "../utilities/commonApis";

// function CreateItemForm() {
//   // Data state
//   const [submittedData, setSubmittedData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch data on mount
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await apiRequest(getItemDetails, "GET");
//       setSubmittedData(response); // Assuming response is an array of items
//     } catch (error) {
//       alert("Error fetching data: " + (error.message || "Unknown error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Approve action
//   const handleApprove = async (item) => {
//     try {
//       await apiRequest(updateItemDetails, "POST", {
//         ...item,
//         productStatus: "Approved"
//       });
//       fetchData(); // Refresh data after update
//     } catch (error) {
//       alert("Error approving item: " + (error.message || "Unknown error"));
//     }
//   };

//   const handleReject = async (item) => {
//     try {
//       await apiRequest(updateItemDetails, "POST", {
//         ...item,
//         productStatus: "Rejected"
//       });
//       fetchData(); // Refresh data after update
//     } catch (error) {
//       alert("Error approving item: " + (error.message || "Unknown error"));
//     }
//   };

//   // Handle Reject action
//   const handleDelete = async (id) => {
//     try {
//       await apiRequest(`${removeItemDetails}?id=${id}`, "POST");
//       fetchData(); // Refresh data after removal
//     } catch (error) {
//       alert("Error rejecting item: " + (error.message || "Unknown error"));
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Box sx={{ padding: 4 }}>
//         {/* Table for displaying submitted data */}
//         <Paper sx={{ padding: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Submitted Data
//           </Typography>
//           {loading ? (
//             <Typography>Loading...</Typography>
//           ) : submittedData.length > 0 ? (
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Recycle Name</TableCell>
//                     <TableCell>Description</TableCell>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Location</TableCell>
//                     <TableCell>Product Status</TableCell>
//                     <TableCell>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {submittedData.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{item.recycleName}</TableCell>
//                       <TableCell>{item.description}</TableCell>
//                       <TableCell>{item.recycleDate}</TableCell>
//                       <TableCell>{item.recycleLocation}</TableCell>
//                       <TableCell>{item.productStatus}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="success"
//                           onClick={() => handleApprove(item)}
//                           sx={{ marginRight: 1 }}
//                         >
//                           Approve
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="warning"
//                           onClick={() => handleReject(item)}
//                           sx={{ marginRight: 1 }}
//                         >
//                           Reject
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           onClick={() => handleDelete(item.id)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Typography>No data available.</Typography>
//           )}
//         </Paper>
//       </Box>
//       <Footer />
//     </>
//   );
// }

// export default CreateItemForm;



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
import { CheckCircle, Cancel, Delete, Search, Clear } from "@mui/icons-material";
import apiRequest from "../utilities/ApiRequest"; // Assuming a utility for API requests
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  getItemDetails,
  removeItemDetails,
  updateItemDetails
} from "../utilities/commonApis";

function CreateItemForm() {
  // State for data and loading
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchRecycleName, setSearchRecycleName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

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

  // Handle Reject action
  const handleReject = async (item) => {
    try {
      await apiRequest(updateItemDetails, "POST", {
        ...item,
        productStatus: "Rejected"
      });
      fetchData(); // Refresh data after update
    } catch (error) {
      alert("Error rejecting item: " + (error.message || "Unknown error"));
    }
  };

  // Handle Delete action
  const handleDelete = async (id) => {
    try {
      await apiRequest(`${removeItemDetails}?id=${id}`, "POST");
      fetchData(); // Refresh data after removal
    } catch (error) {
      alert("Error deleting item: " + (error.message || "Unknown error"));
    }
  };

  // Handle search
  const handleSearch = () => {
    const filteredData = submittedData.filter((item) => {
      return (
        item.recycleName.toLowerCase().includes(searchRecycleName.toLowerCase()) &&
        item.recycleLocation.toLowerCase().includes(searchLocation.toLowerCase())
      );
    });
    setSubmittedData(filteredData);
  };

  // Clear search
  const clearSearch = () => {
    setSearchRecycleName("");
    setSearchLocation("");
    fetchData();
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 4 }} style={{marginTop:"50px"}}>
        <Paper sx={{ padding: 3, marginBottom: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginBottom: 2
            }}
          >
            <TextField
              label="Search by Name"
              value={searchRecycleName}
              onChange={(e) => setSearchRecycleName(e.target.value)}
              size="small"
            />
            {/* <TextField
              label="Search by Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              size="small"
            /> */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              startIcon={<Search />}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={clearSearch}
              startIcon={<Clear />}
            />
          </Box>
          <Typography variant="h6" gutterBottom>
            Items For Approvals
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : submittedData.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Product Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submittedData.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                          transform: "scale(1.01)",
                          transition: "all 0.2s ease-in-out"
                        }
                      }}
                    >
                      <TableCell>{item.recycleName}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.recycleDate}</TableCell>
                      <TableCell>{item.recycleLocation}</TableCell>
                      <TableCell>{item.productStatus}</TableCell>
                      <TableCell>
                        <Button
                          color="success"
                          onClick={() => handleApprove(item)}
                        >
                          <CheckCircle />
                        </Button>
                        <Button
                          color="warning"
                          onClick={() => handleReject(item)}
                        >
                          <Cancel />
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Delete />
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

