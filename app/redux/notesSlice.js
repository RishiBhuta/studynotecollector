import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addnote: (state, action) => {
      state.push(action.payload); // Append new note
    },
  },
});

export const { addnote } = noteSlice.actions;
export default noteSlice.reducer;
