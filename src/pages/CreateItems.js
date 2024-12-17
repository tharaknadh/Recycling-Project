// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Paper,
//   Typography,
//   Box
// } from "@mui/material";
// import apiRequest from "../utilities/ApiRequest";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { createItemDetails } from "../utilities/commonApis";
// import MapComponent from "../components/Googlemap";

// function CreateItems() {
//   // Form state
//   const [formData, setFormData] = useState({
//     recycleName: "",
//     description: "",
//     productStatus: "",
//     imagesUrl: "",
//     recycleDate: "",
//     recycleLocation: "",
//     recycleType: ""
//   });

//   // Submitted data state
//   const [submittedData, setSubmittedData] = useState([]);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await apiRequest(
//         createItemDetails,
//         "POST",
//         formData
//       );
//       setSubmittedData((prev) => [...prev, response]); // Assuming API returns the created item
//       setFormData({
//         recycleName: "",
//         description: "",
//         productStatus: "Pending",
//         imagesUrl: "",
//         recycleDate: "",
//         recycleLocation: "",
//         recycleType: ""
//       });
//     } catch (error) {
//       alert("Error submitting form: " + (error.message || "Unknown error"));
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Box sx={{ padding: 4 }}>
//         <Paper sx={{ padding: 3, marginBottom: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Create Item Details
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Recycle Name"
//               name="recycleName"
//               fullWidth
//               margin="normal"
//               value={formData.recycleName}
//               onChange={handleChange}
//               required
//             />
//             <TextField
//               label="Description"
//               name="description"
//               fullWidth
//               margin="normal"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//             <TextField
//               label="Images URL"
//               name="imagesUrl"
//               fullWidth
//               margin="normal"
//               value={formData.imagesUrl}
//               onChange={handleChange}
//             />
//             <TextField
//               label="Recycle Date"
//               name="recycleDate"
//               type="date"
//               fullWidth
//               margin="normal"
//               value={formData.recycleDate}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
//               required
//             />
//             <TextField
//               label="Recycle Location"
//               name="recycleLocation"
//               fullWidth
//               margin="normal"
//               value={formData.recycleLocation}
//               onChange={handleChange}
//               required
//             />
//             <TextField
//               label="Recycle Type"
//               name="recycleType"
//               fullWidth
//               margin="normal"
//               value={formData.recycleType}
//               onChange={handleChange}
//               required
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               sx={{ mt: 2 }}
//             >
//               Submit
//             </Button>
//           </form>
//         </Paper>
//       </Box>
//       <MapComponent/>
//       <Footer />
//     </>
//   );
// }

// export default CreateItems;


import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import apiRequest from "../utilities/ApiRequest";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createItemDetails } from "../utilities/commonApis";
import "./CreateItems.css"; // Import CSS for animations and styles

function CreateItems() {
  // Form state
  const [formData, setFormData] = useState({
    recycleName: "",
    description: "",
    productStatus: "",
    imagesUrl: "",
    recycleDate: "",
    recycleLocation: "",
    recycleType: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest(createItemDetails, "POST", formData);
      setFormData({
        recycleName: "",
        description: "",
        productStatus: "Pending",
        imagesUrl: "",
        recycleDate: "",
        recycleLocation: "",
        recycleType: "",
      });
      alert("Item submitted successfully!");
    } catch (error) {
      alert("Error submitting form: " + (error.message || "Unknown error"));
    }
  };

  return (
    <>
      <Header />
      <Box className="animated-background">
        <Paper className="form-container">
          <Typography variant="h6" gutterBottom>
            Enter Details
          </Typography>
          <form onSubmit={handleSubmit} className="animated-form">
            <TextField
              label="Name"
              name="recycleName"
              fullWidth
              margin="normal"
              value={formData.recycleName}
              onChange={handleChange}
              required
              className="animated-input"
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              value={formData.description}
              onChange={handleChange}
              required
              className="animated-input"
            />
            <TextField
              label="Images URL"
              name="imagesUrl"
              fullWidth
              margin="normal"
              value={formData.imagesUrl}
              onChange={handleChange}
              className="animated-input"
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
              className="animated-input"
            />
            <TextField
              label="Recycle Location"
              name="recycleLocation"
              fullWidth
              margin="normal"
              value={formData.recycleLocation}
              onChange={handleChange}
              required
              className="animated-input"
            />
            <TextField
              label="Recycle Type"
              name="recycleType"
              fullWidth
              margin="normal"
              value={formData.recycleType}
              onChange={handleChange}
              required
              className="animated-input"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              className="submit-button"
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Box>
      <Footer />
    </>
  );
}

export default CreateItems;

