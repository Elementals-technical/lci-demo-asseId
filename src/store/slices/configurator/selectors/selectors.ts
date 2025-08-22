import { RootState } from "../../../store";

export const getProcessing = (state: RootState) => state.configurator.isProcessing;
