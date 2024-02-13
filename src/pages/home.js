import { Card, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DrawerAppBar from '../component/Navbar';
import { getImagesApi } from '../hooks/api';

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { success, data, error } = await getImagesApi();

        if (success) {
          setImages(data);
        } else {
          console.error('Error fetching images:', error);
          // Handle error as needed
        }
        setLoading(false);
      } catch (error) {
        console.error('Error during fetching images:', error);
        // Handle error as needed
        setLoading(false);
      }
    };

    fetchImages();
  }, []);
  return (
    <>
    <DrawerAppBar />
    <Container style={{marginTop:"8rem"}}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {images.length === 0 ? (
            <Card>
            <CardMedia
              component="img"
              alt="Image"
              height="140"
              image={"https://tse1.explicit.bing.net/th?id=OIP.yQBr1ZkuSM_EgkBpMOoeSgHaD4&pid=Api&P=0&h=220"}
            />
            
                <Typography>Dummy Image current user not posted any images</Typography>
          </Card>
          ) : (
            <>
            <Typography textAlign={'center'} sx={{m:2}}>Images uploaded by all the users 😆</Typography>
            <Grid container spacing={2}>
              {images.map((image,ind) => (
                <Grid item key={image.id} xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt="Image"
                      height="140"
                      image={image?.imageUrl} // Assuming your image object has a 'url' property
                    />
                    
                        <Typography>Image {ind+1}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
            </>
          )}
        </>
      )}
    </Container>
  </>
  )
}

export default Home