// import React, { useState, useEffect } from "react";
// import { TextField, Paper, Typography, Box, Grid, Button } from "@mui/material";
// import apiRequest from "../utilities/ApiRequest"; // Assuming a utility for API requests
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { getItemDetails } from "../utilities/commonApis";

// function RecycleHistoryTracking() {
//   // State for data and search inputs
//   const [submittedData, setSubmittedData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchName, setSearchName] = useState("");
//   const [searchLocation, setSearchLocation] = useState("");

//   // Fetch data on mount
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Fetch data from API
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await apiRequest(getItemDetails, "GET");
//       setSubmittedData(response); // Assuming response is an array of items
//       setFilteredData(response); // Initialize filtered data
//     } catch (error) {
//       alert("Error fetching data: " + (error.message || "Unknown error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle search functionality
//   const handleSearch = () => {
//     const filtered = submittedData.filter(
//       (item) =>
//         (!searchName ||
//           item.recycleName.toLowerCase().includes(searchName.toLowerCase())) &&
//         (!searchLocation ||
//           item.recycleLocation
//             .toLowerCase()
//             .includes(searchLocation.toLowerCase()))
//     );
//     setFilteredData(filtered);
//   };

//   // Clear search inputs and reset data
//   const clearSearch = () => {
//     setSearchName("");
//     setSearchLocation("");
//     setFilteredData(submittedData);
//   };

//   return (
//     <>
//       <Header />
//       <Box sx={{ padding: 4 }}>
//         {/* Search Inputs */}
//         <Paper sx={{ padding: 2, marginBottom: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Search
//           </Typography>
//           <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//             <TextField
//               label="Search by Name"
//               value={searchName}
//               onChange={(e) => setSearchName(e.target.value)}
//               variant="outlined"
//             />
//             <TextField
//               label="Search by Location"
//               value={searchLocation}
//               onChange={(e) => setSearchLocation(e.target.value)}
//               variant="outlined"
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSearch}
//               sx={{ alignSelf: "center" }}
//             >
//               Search
//             </Button>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={clearSearch}
//               sx={{ alignSelf: "center" }}
//             >
//               Clear Search
//             </Button>
//           </Box>
//         </Paper>

//         {/* Box Layout for Data */}
//         <Paper sx={{ padding: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Submitted Data
//           </Typography>
//           {loading ? (
//             <Typography>Loading...</Typography>
//           ) : filteredData.length > 0 ? (
//             <Grid container spacing={3}>
//               {filteredData.map((item, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <Box
//                     sx={{
//                       border: "1px solid #ddd",
//                       borderRadius: 2,
//                       padding: 2,
//                       boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
//                     }}
//                   >
//                     <Typography variant="subtitle1" gutterBottom>
//                       <strong>Recycle Name:</strong> {item.recycleName}
//                     </Typography>
//                     <Typography variant="body2" gutterBottom>
//                       <strong>Description:</strong> {item.description}
//                     </Typography>
//                     <Typography variant="body2" gutterBottom>
//                       <strong>Date:</strong> {item.recycleDate}
//                     </Typography>
//                     <Typography variant="body2" gutterBottom>
//                       <strong>Location:</strong> {item.recycleLocation}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Status:</strong> {item.productStatus}
//                     </Typography>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             <Typography>No data available.</Typography>
//           )}
//         </Paper>
//       </Box>
//       <Footer />
//     </>
//   );
// }

// export default RecycleHistoryTracking;



import React, { useState, useEffect } from "react";
import { TextField, Paper, Typography, Box, Grid, Button } from "@mui/material";
import apiRequest from "../utilities/ApiRequest"; // Assuming a utility for API requests
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getItemDetails } from "../utilities/commonApis";

function RecycleHistoryTracking() {
  const [submittedData, setSubmittedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const defaultImage = "https://via.placeholder.com/150"; // Replace with your desired default image URL

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiRequest(getItemDetails, "GET");
      setSubmittedData(response);
      setFilteredData(response);
    } catch (error) {
      alert("Error fetching data: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = submittedData.filter(
      (item) =>
        (!searchName ||
          item.recycleName.toLowerCase().includes(searchName.toLowerCase())) &&
        (!searchLocation ||
          item.recycleLocation
            .toLowerCase()
            .includes(searchLocation.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  const clearSearch = () => {
    setSearchName("");
    setSearchLocation("");
    setFilteredData(submittedData);
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 4 }}>
        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Search
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Search by Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ alignSelf: "center" }}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearSearch}
              sx={{ alignSelf: "center" }}
            >
              Clear Search
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Submitted Data
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : filteredData.length > 0 ? (
            <Grid container spacing={3}>
              {filteredData.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      padding: 2,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      src={item.imagesUrl}
                      alt={item.recycleName}
                      onError={(e) => (e.target.src = defaultImage)}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "8px",
                      }}
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Recycle Name:</strong> {item.recycleName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Description:</strong> {item.description}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Date:</strong> {item.recycleDate}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Location:</strong> {item.recycleLocation}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Status:</strong> {item.productStatus}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No data available.</Typography>
          )}
        </Paper>
      </Box>
      <Footer />
    </>
  );
}

export default RecycleHistoryTracking;
