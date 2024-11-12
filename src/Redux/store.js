import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { dialogReducer, userReducer, popupReducer, classesReducer, temarioReducer, videoReducer, audioReducer, repasoReducer } from './slices';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  user: userReducer,
  dialog: dialogReducer,
  popup: popupReducer,
  classes: classesReducer,
  temario: temarioReducer,
  video: videoReducer,
  audio: audioReducer,
  repaso: repasoReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
