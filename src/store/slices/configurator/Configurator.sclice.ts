import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ConfiguratorType } from "./type";

interface ConfiguratorStateI {
  isProcessing: boolean;
}

const initialState: ConfiguratorStateI = {
  isProcessing: false,
};

export const configuratorSlice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    changeProcessing: (state, action: PayloadAction<{ isProcessing: boolean }>) => {
      state.isProcessing = action.payload.isProcessing;
    },
  },
});

export const { changeProcessing } = configuratorSlice.actions;

export default configuratorSlice.reducer;
