import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './CharacterSlice';

const store = configureStore({
  reducer: {
    character: characterReducer
  }
});

export default store;
