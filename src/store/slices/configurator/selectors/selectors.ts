import { RootState } from "../../../store";

export const getProcessing = (state: RootState) => state.configurator.isProcessing;
export const getConfiguratorView = (state: RootState) => state.configurator.configuratorView;
