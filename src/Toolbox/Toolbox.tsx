import React, { useState } from 'react';
import {
  Box, Button, Divider, Grid, IconButton, Stack, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AutoAwesomeMosaicTwoToneIcon from '@mui/icons-material/AutoAwesomeMosaicTwoTone';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone';
import TextFieldsTwoTone from '@mui/icons-material/TextFieldsTwoTone';
import TextSnippetTwoToneIcon from '@mui/icons-material/TextSnippetTwoTone';
import ZoomInTwoToneIcon from '@mui/icons-material/ZoomInTwoTone';
import ZoomOutTwoToneIcon from '@mui/icons-material/ZoomOutTwoTone';
import BrushTwoToneIcon from '@mui/icons-material/BrushTwoTone';
import NearMeTwoToneIcon from '@mui/icons-material/NearMeTwoTone';
import ImageSearchTwoToneIcon from '@mui/icons-material/ImageSearchTwoTone';
import AutoGraphTwoToneIcon from '@mui/icons-material/AutoGraphTwoTone';
import PhotoFilterTwoToneIcon from '@mui/icons-material/PhotoFilterTwoTone';
import Modal from '@mui/material/Modal';
import { RootState } from '../redux/store';
import ObjectAnimation from './objectAnimation';

import {
  addImgURL, addText, getCanvas, reset, selectLayer,
} from '../Canvas';

import { UnsplashBrowser, AddSelected } from '../shared/components/unsplash';
import ImageUploadButton from './ImageUploadButton';
import VideoUploadButton from './VideoUploadButton';
import TemplatePanel from './TemplatePanel';
import CustomizePanel from './CustomizePanel';
import ElementPanel from './ElementPanel';
import ImagePanel from './ImagePanel';

// TODO: Split every tool to its own component
/**
 * @description this component is the container
 * of all the availiable tools that can be used with the canvas application
 */
export default function Toolbox() {
  const elem = useSelector((state: RootState) => getCanvas(state.canvas.canvasId));
  const canvasObjects = useSelector((state: RootState) => state.canvas.canvasObjects);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showTemplates, setShowTemplates] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const [showImages, setShowImages] = useState(false);

  if (!elem) return null;
  const { fabric: canvas } = elem;

  const download = () => {
    const url = canvas?.toDataURL({
      format: 'png',
    });

    if (url) {
      const link = document.createElement('a');
      link.download = `${new Date().toISOString()}.png`;
      link.href = url;
      link.click();
    }
  };

  const addImagesToCanvas:AddSelected = (selected) => {
    selected.forEach((url) => {
      dispatch(addImgURL(url));
    });
    setOpen(false);
  };

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'start', flexDirection: 'column', position: 'relative', height: '100%', width: '100%',
    }}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between" height="100%">
        <Grid
          width="120px"
          height="90%"
          sx={{
            position: 'fixed',
            top: (theme) => theme.spacing(8),
            boxShadow: (theme) => theme.shadows[2],
            backgroundColor: 'lightgray',
          }}
          container
        >
          <Grid item xs={12}>
            <IconButton
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                canvas.isDrawingMode = false;
              }}
            >
              <NearMeTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Select</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <IconButton
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                canvas.isDrawingMode = true;
              }}
            >
              <BrushTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Draw</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <IconButton
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                setShowTemplates(true);
                setShowCustomize(false);
                setShowElements(false);
                setShowImages(false);
              }}
            >
              <AutoAwesomeMosaicTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Template</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <IconButton
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                setShowTemplates(false);
                setShowCustomize(true);
                setShowElements(false);
                setShowImages(false);
              }}
            >
              <TuneTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Customize</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <IconButton
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                setShowTemplates(false);
                setShowCustomize(false);
                setShowElements(true);
                setShowImages(false);
              }}
            >
              <ExtensionTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Elements</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <IconButton
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                setShowTemplates(false);
                setShowCustomize(false);
                setShowElements(false);
                setShowImages(true);
              }}
            >
              <ImageSearchTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Images</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            {/* <IconButton
              sx={{ color: 'black' }}
              onClick={handleOpen}
            >
              <VideocamTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Videos</div>
            </IconButton> */}
            <VideoUploadButton />
          </Grid>

          <Grid item xs={12}>
            <ImageUploadButton />
          </Grid>

          <Grid item xs={12}>
            <IconButton
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                dispatch(addText());
              }}
            >
              <TextFieldsTwoTone width="100%" />
              <div style={{ fontSize: '16px' }}>Text</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <IconButton
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                dispatch(addText());
              }}
            >
              <AutoGraphTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Graphics</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <IconButton
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                dispatch(addText());
              }}
            >
              <PhotoFilterTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Pixabay</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <IconButton
              disabled
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                dispatch(addText());
              }}
            >
              <ZoomInTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Zoom In</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <IconButton
              disabled
              sx={{ color: 'black', '&:hover': { backgroundColor: 'white' } }}
              onClick={() => {
                dispatch(addText());
              }}
            >
              <ZoomOutTwoToneIcon width="100%" />
              <div style={{ fontSize: '16px' }}>Zoom Out</div>
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <ObjectAnimation />
          </Grid>
        </Grid>

        <div
          style={{
            top: 60,
            left: 120,
            position: 'fixed',
            width: '300px',
            height: '650px',
            border: '1px solid lightgray',
            borderRadius: '1px',
          }}
        >
          {showTemplates && <TemplatePanel />}
          {showCustomize && <CustomizePanel />}
          {showElements && <ElementPanel />}
          {showImages && <ImagePanel />}
        </div>

        <Stack
          sx={{
            backgroundColor: '#fff',
            boxShadow: (theme) => theme.shadows[1],
            zIndex: 9999,
            position: 'fixed',
            right: (theme) => theme.spacing(2),
            bottom: (theme) => theme.spacing(2),
          }}
          height="200px"
          overflow="auto"
          width="200px"
        >
          <Typography textAlign="center" p={1}>
            Layers
          </Typography>

          {canvasObjects.map(({ type, name }) => (
            <div key={type}>
              <Divider />
              <Button endIcon={<TextSnippetTwoToneIcon color="secondary" />} onClick={() => dispatch(selectLayer(name as string))}>
                {type}
              </Button>
            </div>
          ))}
        </Stack>

      </Box>
      <Button
        onClick={() => dispatch(reset())}
        sx={{
          width: 130,
          position: 'fixed',
          zIndex: 9999,
          top: (theme) => theme.spacing(1.7),
          right: (theme) => theme.spacing(38),
        }}
        color="error"
        variant="contained"
      >
        Remove ALL
      </Button>
      <Button
        onClick={download}
        sx={{
          width: 130,
          position: 'fixed',
          zIndex: 9999,
          top: (theme) => theme.spacing(1.7),
          right: (theme) => theme.spacing(20),
        }}
        color="success"
        variant="contained"
      >
        Download
      </Button>
      <Button
        onClick={() => dispatch(reset())}
        sx={{
          color: 'black',
          background: 'white',
          width: 130,
          position: 'fixed',
          zIndex: 9999,
          top: (theme) => theme.spacing(1.7),
          right: (theme) => theme.spacing(2),
        }}
        variant="contained"
      >
        Logout
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Unsplash Browser"
        aria-describedby="look for image of your liking"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50vw',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
        >
          <UnsplashBrowser addSelected={addImagesToCanvas} />
        </Box>
      </Modal>
    </Box>
  );
}
