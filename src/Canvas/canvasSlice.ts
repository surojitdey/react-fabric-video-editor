import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fabric } from 'fabric';

export type CanvasState = {
  canvasId: string
  elements: {
    [x: string]: {
      type: 'text' | 'image',
      id: string
    }
  }
  elemIndexes: number[]
  canvasObjects: fabric.Object[]
};

export const getCanvas = (id: string): { fabric: fabric.Canvas } => {
  const elem = document.getElementById(id) as unknown as {
    fabric: fabric.Canvas
  };

  return elem;
};
const initialState: CanvasState = {
  canvasId: '',
  elements: {},
  elemIndexes: [],
  canvasObjects: [],
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<string>) => {
      state.canvasId = action.payload;
    },
    reset: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      canvas.clear();
      canvas.requestRenderAll();
    },
    addText: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);

      const id = uuidv4();
      const textbox = new fabric.Textbox('New text', {
        left: 50,
        top: 50,
        width: 200,
        fontSize: 28,
        fill: 'black',
        name: id,
      });

      canvas.centerObject(textbox);
      canvas.add(textbox);
      canvas.requestRenderAll();
      state.canvasObjects = canvas.getObjects().map((i) => i.toObject(['name', 'type']));
    },
    addImgURL: (state, action: PayloadAction<string>) => {
      const elem = getCanvas(state.canvasId);
      if (elem && elem.fabric) {
        const { fabric: canvas } = elem;

        const imgElem = action.payload;
        // const id = uuidv4();
        // const options: fabric.IImageOptions = {
        //   name: id,
        // };

        fabric.Image.fromURL(action.payload, (image) => {
          // @ts-ignore
          if (canvas?.width < image.width) {
            // @ts-ignore
            const ratio = canvas.width / image.width;
            // @ts-ignore
            image.scaleToWidth(canvas.width);
            // @ts-ignore
            image.scaleToHeight(image.height * ratio);
            // @ts-ignore
          } else if (canvas.height < imgElem.naturalHeight) {
            // @ts-ignore
            const ratio = canvas.height / image.height;
            // @ts-ignore
            image.scaleToHeight(canvas.height);
            // @ts-ignore
            image.scaleToWidth(image.width * ratio);
          }
          canvas.centerObject(image);
          canvas.add(image);
          canvas.requestRenderAll();
        }, {
          crossOrigin: 'anonymous',
        });

        state.canvasObjects = canvas.getObjects().map((i) => i.toObject(['name', 'type']));
      }
    },
    addImg: (state, action: PayloadAction<HTMLImageElement>) => {
      const elem = getCanvas(state.canvasId);
      if (elem && elem.fabric) {
        const { fabric: canvas } = elem;

        const imgElem = action.payload;
        const id = uuidv4();
        const options: fabric.IImageOptions = {
          name: id,
        };
        // @ts-ignore
        if (canvas?.width < imgElem.naturalWidth) {
          // @ts-ignore
          const ratio = canvas.width / imgElem.naturalWidth;
          options.width = canvas.width;
          options.height = imgElem.naturalHeight * ratio;
          // @ts-ignore
        } else if (canvas.height < imgElem.naturalHeight) {
          // @ts-ignore
          const ratio = canvas.height / imgElem.naturalHeight;
          options.height = canvas.height;
          options.width = imgElem.naturalWidth * ratio;
        }
        // options.height = 120;
        // options.width = 100;
        // options.left = 0;
        // options.top = 0;
        const image = new fabric.Image(action.payload, options);
        // image.scaleToHeight(100);
        // image.scaleToWidth(100);

        canvas.centerObject(image);
        canvas.add(image);
        canvas.requestRenderAll();
        state.canvasObjects = canvas.getObjects().map((i) => i.toObject(['name', 'type']));
      }
    },
    addVideo: (state, action: PayloadAction<HTMLVideoElement>) => {
      const elem = getCanvas(state.canvasId);
      if (elem && elem.fabric) {
        const { fabric: canvas } = elem;
        const id = uuidv4();
        const options: fabric.IImageOptions = {
          name: id,
        };
        options.width = canvas.width;
        options.height = canvas.height;
        options.objectCaching = false;
        options.crossOrigin = 'anonymous';
        options.scaleX = 1;
        options.scaleY = 1;
        options.dirty = false;
        const video = new fabric.Image(action.payload, options);

        canvas.centerObject(video);
        canvas.add(video);
        const videoEl = video.getElement() as HTMLVideoElement;
        videoEl.play();
        const playTrigger = () => {
          if (videoEl.paused || videoEl.ended) return false;
          canvas.requestRenderAll();
          setTimeout(playTrigger, 20);
          return true;
        };
        video.getElement().addEventListener('play', playTrigger, false);
        state.canvasObjects = canvas.getObjects().map((i) => i.toObject(['name', 'type']));
      }
    },
    deleteItem: (state, { payload: id }: PayloadAction<string>) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const item = canvas.getObjects().find((obj) => obj.name === id);
      if (item) {
        canvas.remove(item);
        canvas.requestRenderAll();
        state.canvasObjects = canvas.getObjects().map((i) => i.toObject(['name', 'type']));
      }
    },
    deleteSelectedLayer: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const item = canvas.getActiveObject();
      if (item) {
        canvas.remove(item);
        canvas.requestRenderAll();
        state.canvasObjects = canvas.getObjects().map((i) => i.toObject(['name', 'type']));
      }
    },
    selectLayer: (state, { payload: id }: PayloadAction<string>) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const item = canvas.getObjects().find((obj) => obj.name === id);
      if (item) {
        canvas.setActiveObject(item);
        canvas.requestRenderAll();
      }
    },
    addSlideTopAnimation: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        const initialTop = activeObject.get('top');
        activeObject.set({ top: -150 });
        activeObject.animate('top', String(initialTop), {
          duration: 1000,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
    },
    addSlideBottomAnimation: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        fabric.util.animate({
          startValue: canvas.height === undefined ? 350 : canvas.height + 150,
          endValue: canvas.getActiveObject().get('top'),
          duration: 1000,
          onChange: (value) => {
            canvas.getActiveObject().set({ top: value });
            canvas.renderAll();
          },
          onComplete: () => {
            canvas.getActiveObject().setCoords();
          },
        });
      }
    },
    addSlideLeftAnimation: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        const initial = activeObject.get('left');
        activeObject.set({ left: -150 });
        activeObject.animate('left', String(initial), {
          duration: 1000,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
    },
    addSlideRightAnimation: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        fabric.util.animate({
          startValue: canvas.width === undefined ? 450 : canvas.width + 150,
          endValue: canvas.getActiveObject().get('left'),
          duration: 1000,
          onChange: (value) => {
            canvas.getActiveObject().set({ left: value });
            canvas.renderAll();
          },
          onComplete: () => {
            canvas.getActiveObject().setCoords();
          },
        });
      }
    },
    addFadeInAnimation: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set({ opacity: 0 });
        activeObject.animate('opacity', '1', {
          duration: 1000,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
    },
    addFadeOutAnimation: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.animate('opacity', '0', {
          duration: 1000,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
    },
    addScaleInAnimation: (state) => {
      const { fabric: canvas } = getCanvas(state.canvasId);
      const activeObject = canvas.getActiveObject();
      activeObject.set({
        scaleX: 0,
        scaleY: 0,
      });
      if (activeObject) {
        activeObject.animate({
          scaleX: 1,
          scaleY: 1,
        }, {
          duration: 1000,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
    },
  },
});

export const {
  init,
  selectLayer,
  addText,
  addImg,
  addImgURL,
  deleteItem,
  deleteSelectedLayer,
  reset,
  addSlideTopAnimation,
  addSlideBottomAnimation,
  addSlideLeftAnimation,
  addSlideRightAnimation,
  addFadeInAnimation,
  addFadeOutAnimation,
  addScaleInAnimation,
  addVideo,
} = canvasSlice.actions;
export const canvasReducer = canvasSlice.reducer;
