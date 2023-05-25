import React, { ChangeEventHandler, useRef } from 'react';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addImg } from '../Canvas';

export default function ImageUploadButton() {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgObj = new Image();

      imgObj.src = event.target?.result as string;

      imgObj.onload = () => {
        dispatch(addImg(imgObj));
      };
    };

    if (e.target.files) {
      const file = e.target.files.item(0) as File;
      reader.readAsDataURL(file);
    }
  };
  const onClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <IconButton sx={{ color: 'black' }} onClick={onClick}>
        <CloudUploadTwoToneIcon width="100%" />
        <div style={{ fontSize: '16px' }}>Uploads</div>
        <input onChange={onFileChange} style={{ display: 'none' }} ref={fileInputRef} type="file" />
      </IconButton>
    </>
  );
}
