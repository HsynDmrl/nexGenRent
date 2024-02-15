import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminToggleState {
  isOpen: boolean;
}

const initialState: AdminToggleState = {
  isOpen: true,
};

const adminToggleSlice = createSlice({
  name: 'adminToggle',
  initialState,
  reducers: {
    toggleAdminSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setOpenStatus: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleAdminSidebar, setOpenStatus } = adminToggleSlice.actions;

export default adminToggleSlice.reducer;
