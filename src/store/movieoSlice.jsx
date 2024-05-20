import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bannerData: [],
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBannerData } = movieSlice.actions;

export default movieSlice.reducer;
