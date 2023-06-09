import React, {
  useLayoutEffect, useRef, useContext,
} from 'react';
import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import {
  Box,
} from '@mui/material';
import { init, CanvasCTX } from '.';
import { ObjectTypes, openContextMenu } from './ContextMenu/contextMenuSlice';

export default function CanvasApp() {
  const { setCanvas } = useContext(CanvasCTX);

  const canvRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      height: 300,
      width: 400,
      // height: canvRef.current?.offsetHeight,
      // width: canvRef.current?.offsetWidth,
      fireRightClick: true,
      fireMiddleClick: true,
      stopContextMenu: true,
      backgroundColor: undefined,
      backgroundImage: undefined,
    });
    canvas.renderAll();
    canvas.on('mouse:down', (event) => {
      if (event.button === 3) {
        if (event.target) {
          const { x, y } = canvas.getPointer(event.e);
          dispatch(openContextMenu({
            position: {
              // @ts-ignore
              left: canvRef.current?.offsetLeft + x,
              top: y,
            },
            type: event.target.type as ObjectTypes,
            objectID: event.target.name,

          }));
        }
      }
    });

    setCanvas(canvas);
    // @ts-ignore
    document.getElementById('canvas').fabric = canvas;

    dispatch(init('canvas'));
  }, []);

  const style = {
    border: '1px solid #1f1f1f',
    borderRadius: '5px',
  };

  return (
    <Box
      ref={canvRef}
      sx={{
        position: 'relative',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
      height="100vh"
      width="100%"
    >
      <canvas id="canvas" style={style} />
    </Box>
  );
}
