import React, { useState } from 'react';
import { fabric } from 'fabric';
import { Grid } from '@mui/material';
import CanvasApp from './Canvas/Canvas';
import CanvasControls from './Toolbox/Toolbox';
import ContextMenu from './Canvas/ContextMenu/ContextMenu';
import { CanvasCTX } from './Canvas';

function App() {
  const [canvasVal, setCanvasVal] = useState<fabric.Canvas>();
  const setCanvas = (canv: fabric.Canvas) => {
    setCanvasVal(canv);
  };

  return (
    <CanvasCTX.Provider value={{
      canvas: canvasVal,
      setCanvas,
    }}
    >
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <CanvasControls />

        </Grid>
        <Grid item xs={11}>
          <CanvasApp />
        </Grid>
      </Grid>
      <ContextMenu />
    </CanvasCTX.Provider>
  );
}

export default App;
