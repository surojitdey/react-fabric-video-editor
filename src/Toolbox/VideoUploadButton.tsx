import React, { ChangeEventHandler, useRef } from 'react';
import { Animation } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addVideo } from '../Canvas';

export default function VideoUploadButton() {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toBase64 = (file:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const onFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    // const reader = new FileReader();
    const video = document.getElementById('video') as HTMLVideoElement;
    // reader.onload = (event) => {
    //   const buffer = event.target?.result;

    //   const videoBlob = new Blob([new Uint8Array(buffer as ArrayBuffer)], { type: 'video/mp4' });
    //   const url = window.URL.createObjectURL(videoBlob);
    //   video.src = url;
    //   video.onload = () => {
    //     dispatch(addVideo(video));
    //   };
    // };

    if (e.target.files) {
      // console.log(e.target.files);
      const file = e.target.files.item(0) as File;
      const base64: any = await toBase64(file);
      // console.log(typeof base64);
      video.src = base64;
      dispatch(addVideo(video));
      // reader.readAsDataURL(file);
      // reader.onload = (event) => {
      //   const buffer = event.target?.result;
      //   const videoBlob =
      //   new Blob([new Uint8Array(buffer as ArrayBuffer)], { type: 'video/webm' });
      //   console.log(videoBlob);
      //   console.log(reader.result);
      //   const url = window.URL.createObjectURL(reader.result);
      //   video.src = url;
      //   video.onload = () => {
      //     dispatch(addVideo(video));
      //   };
      // };
    }
  };

  // const getVideoElement = (url:string) => {
  //   const videoE = document.createElement('video');
  //   // videoE.width = 530;
  //   // videoE.height = 298;
  //   videoE.muted = true;
  //   videoE.crossOrigin = 'anonymous';
  //   const source = document.createElement('source');
  //   source.src = url;
  //   source.type = 'video/mp4';
  //   videoE.appendChild(source);
  //   return videoE;
  // };

  const onClick = () => {
    fileInputRef.current?.click();
    // const urlMp4 = 'https://static.videezy.com/system/resources/previews/000/008/445/original/Dark_Haired_Girl_in_disbelief_1.mp4';
    // const urlMp4 = 'https://static.videezy.com/system/resources/previews/000/006/879/original/Lab38.mp4';
    // const video = getVideoElement(urlMp4);
    // // console.log(video);
    // dispatch(addVideo(video));
    // video.onload = () => {
    // };
  };

  return (
    <>
      <IconButton color="primary" onClick={onClick}>
        <Animation width="100%" />
        <input onChange={onFileChange} style={{ display: 'none' }} ref={fileInputRef} type="file" />

      </IconButton>
      <video height="360" width="640" id="video" style={{ display: 'none' }}>
        <source src="" type="video/mp4" />
        <track src="captions_en.vtt" kind="captions" label="english_captions" />
      </video>
    </>
  );
}
