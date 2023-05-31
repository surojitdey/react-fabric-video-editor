import React from 'react';
import { Grid } from '@mui/material';

export default function ElementPanel() {
  return (
    <div style={{ margin: '30px' }}>
      <div>
        <h3>Elements</h3>
      </div>
      <Grid
        width="240px"
        height="90%"
        container
      >
        <Grid item xs={3}>
          <img
            src="https://ik.imagekit.io/scenify/1635014150489_628269.png"
            alt="google"
            style={{ height: 50, width: 50 }}
          />
        </Grid>
        <Grid item xs={3}>
          <img
            src="https://ik.imagekit.io/scenify/1635014323800_275038.png"
            alt="google"
            style={{ height: 50, width: 50 }}
          />
        </Grid>
        <Grid item xs={3}>
          <img
            src="https://ik.imagekit.io/scenify/1635014150489_628269.png"
            alt="google"
            style={{ height: 50, width: 50 }}
          />
        </Grid>
        <Grid item xs={3}>
          <img
            src="https://ik.imagekit.io/scenify/1635014323800_275038.png"
            alt="google"
            style={{ height: 50, width: 50 }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
