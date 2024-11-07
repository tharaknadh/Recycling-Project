import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import '../css/Body.css';
import Chatbot from './Chatbot';
import '../css/Chart.css';

function Homebody() {
 
  return (
    <Container className="body-container" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="center">
        <video
          src={require('../asserts/plas.mp4')}
          autoPlay
          loop
          muted
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
      {/* About Section */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2">
            About Plastic Recycling
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Plastic recycling is the process of recovering plastic waste and reprocessing the material into useful products.
            Since most plastics are non-biodegradable, recycling is a part of global efforts to reduce plastic in the waste stream.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            The recycling process involves collecting waste plastic, sorting it, and then processing it into new materials.
            This can involve mechanical recycling, chemical recycling, or other innovative methods.
          </Typography>
        </Grid>
      </Grid>
      
      <Typography variant="h4" component="h2" style={{padding:"20px"}}>Here Some Products from Plastic Recycle</Typography>
      <Carousel interval={3000} wrap={false}>
         <Carousel.Item>
           <img
            src={require('../asserts/06-SugaMat-SOURCE-Suga.webp')}
            alt="Image 1"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require('../asserts/Bouteille.jpg')}            
            alt="Image 2"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require('../asserts/Rothys_logo.png')}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require('../asserts/image4.jpg')}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require('../asserts/image5.jpg')}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require('../asserts/image6.jpg')}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require('../asserts/images (1).jpeg')}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require('../asserts/images (1).png')}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require('../asserts/images (2).png')}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require('../asserts/images (3).png')}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={require('../asserts/images.jpeg')}
            alt="Image 3"
            className="carousel-image"
          />
        </Carousel.Item>
      </Carousel>
      <Chatbot/>
    </Container>
  );
}

export default Homebody;
