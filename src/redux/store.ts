import { configureStore } from '@reduxjs/toolkit';
import { canvasReducer } from '../Canvas/canvasSlice';
import contextMenu from '../Canvas/ContextMenu/contextMenuSlice';

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    contextMenu,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['canvas/addImg', 'canvas/addVideo'],
      // Ignore these field paths in all actions
      // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // Ignore these paths in the state
      // ignoredPaths: ['items.dates'],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
