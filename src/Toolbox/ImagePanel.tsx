import React from 'react';
import { Grid } from '@mui/material';

export default function ImagePanel() {
  return (
    <div style={{ margin: '30px' }}>
      <div>
        <h3>Images</h3>
      </div>
      <Grid
        width="240px"
        height="90%"
        container
      >
        <Grid item xs={6}>
          <img
            src="https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg"
            alt="google"
            style={{ height: 100, width: 110 }}
          />
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://metricool.com/wp-content/uploads/jason-blackeye-364785-2.jpg"
            alt="google"
            style={{ height: 100, width: 110 }}
          />
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://www.w3schools.com/css/img_5terre.jpg"
            alt="google"
            style={{ height: 100, width: 110 }}
          />
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://www.befunky.com/images/prismic/f5ca4181-01da-4237-92bf-b6938359503e_hero-blur-image-5.jpg?auto=avif,webp&format=jpg&width=896"
            alt="google"
            style={{ height: 100, width: 110 }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
