import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import "../css/Body.css";
import Chatbot from "./Chatbot";
import UserContribution from "./UserContribution";
import "../css/Chart.css";

function Body() {
  return (
    <Container
      style={{ marginTop: "44px" }}
      className="body-container"
      sx={{ mt: 4 }}
    >
      <Box display="flex" justifyContent="center" style={{ width: "100vw" }}>
        <video
          src={require("../asserts/recycle.mp4")}
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      {/* About Section */}
      <Grid
        container
        spacing={4}
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: "#3f51b5",
              textAlign: "center",
              mb: 2
            }}
          >
            About Plastic Recycling
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              lineHeight: "1.8",
              color: "#555",
              textAlign: "justify"
            }}
          >
            Plastic recycling is the process of recovering plastic waste and
            reprocessing the material into useful products. Since most plastics
            are non-biodegradable, recycling is a part of global efforts to
            reduce plastic in the waste stream.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              lineHeight: "1.8",
              color: "#555",
              textAlign: "justify"
            }}
          >
            The recycling process involves collecting waste plastic, sorting it,
            and then processing it into new materials. This can involve
            mechanical recycling, chemical recycling, or other innovative
            methods.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <UserContribution />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: "relative",
            "&:hover .video-container": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }
          }}
        >
          <div
            className="video-container"
            style={{ borderRadius: "8px", overflow: "hidden" }}
          >
            <h2
              className="user-contribution-title"
              style={{
                textAlign: "center",
                padding: "16px",
                fontSize: "1.5rem",
                fontWeight: "bold"
              }}
            >
              Video Tutorials
            </h2>
            <iframe
              width="100%"
              height="270"
              src="https://www.youtube.com/embed/ZJxoMaOzkTI?si=3Z6tJ3sgDG3P2W3H"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: "8px" }}
            />
          </div>
        </Grid>
      </Grid>

      <Typography
        variant="h4"
        component="h2"
        style={{ padding: "20px", textAlign: "center" }}
      >
        Here are Some Products from Plastic Recycle
      </Typography>

      <Carousel interval={3000} wrap={false}>
        <Carousel.Item>
          <img
            src={require("../asserts/06-SugaMat-SOURCE-Suga.webp")}
            alt="Image 1"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require("../asserts/Bouteille.jpg")}
            alt="Image 2"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require("../asserts/Rothys_logo.png")}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require("../asserts/image4.jpg")}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require("../asserts/image5.jpg")}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require("../asserts/image6.jpg")}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require("../asserts/images (1).jpeg")}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require("../asserts/images (1).png")}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require("../asserts/images (2).png")}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require("../asserts/images (3).png")}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require("../asserts/images.jpeg")}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
      </Carousel>

      <Chatbot />
    </Container>
  );
}

export default Body;
