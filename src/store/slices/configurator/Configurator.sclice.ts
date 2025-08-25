import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ConfiguratorStateI, ConfiguratorType } from "./type";

const initialState: ConfiguratorStateI = {
  isProcessing: false,
  configuratorView: "2D",
  isLoadedIframePlayer: false,
};

export const configuratorSlice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    changeProcessing: (state, action: PayloadAction<{ isProcessing: boolean }>) => {
      state.isProcessing = action.payload.isProcessing;
    },
    changeСonfiguratorView: (state, action: PayloadAction<ConfiguratorType>) => {
      state.configuratorView = action.payload;
    },
    changeIsLoadedIframePlayer: (state, action: PayloadAction<boolean>) => {
      state.isLoadedIframePlayer = action.payload;
    },
  },
});

export const { changeProcessing, changeСonfiguratorView, changeIsLoadedIframePlayer } = configuratorSlice.actions;

export default configuratorSlice.reducer;
