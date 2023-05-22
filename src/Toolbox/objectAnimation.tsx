import React from 'react';
import { useDispatch } from 'react-redux';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  addSlideTopAnimation,
  addSlideLeftAnimation,
  addFadeInAnimation,
  addFadeOutAnimation,
  addSlideRightAnimation,
  addSlideBottomAnimation,
  addScaleInAnimation,
} from '../Canvas';

const ObjectAnimation = () => {
  const dispatch = useDispatch();
  const handleAnimation = (event: SelectChangeEvent) => {
    if (event.target.value === 'left') {
      dispatch(addSlideLeftAnimation());
    }
    if (event.target.value === 'right') {
      dispatch(addSlideRightAnimation());
    }
    if (event.target.value === 'top') {
      dispatch(addSlideTopAnimation());
    }
    if (event.target.value === 'bottom') {
      dispatch(addSlideBottomAnimation());
    }
    if (event.target.value === 'fadein') {
      dispatch(addFadeInAnimation());
    }
    if (event.target.value === 'fadeout') {
      dispatch(addFadeOutAnimation());
    }
    if (event.target.value === 'scalein') {
      dispatch(addScaleInAnimation());
    }
  };
  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        onChange={handleAnimation}
      >
        <MenuItem value="top">Slide Top</MenuItem>
        <MenuItem value="bottom">Slide Bottom</MenuItem>
        <MenuItem value="left">Slide Left</MenuItem>
        <MenuItem value="right">Slide Right</MenuItem>
        <MenuItem value="fadein">Fade In</MenuItem>
        <MenuItem value="fadeout">Fade Out</MenuItem>
        <MenuItem value="scalein">Scale In</MenuItem>
      </Select>
    </>
  );
};
export default ObjectAnimation;
