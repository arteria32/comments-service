import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ThemesEnum } from '../../types/system/ui-types';

type UIManagerSlice = {
  theme: ThemesEnum;
};

// Define the initial state using that type
const initialState: UIManagerSlice = {
  theme: ThemesEnum.LIGHT,
};

export const uiManagerSlice = createSlice({
  name: 'uiManagerSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemesEnum>) => {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = uiManagerSlice.actions;

export default uiManagerSlice;
