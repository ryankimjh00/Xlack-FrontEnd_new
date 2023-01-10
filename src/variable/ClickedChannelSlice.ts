import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClickedChannelState {
  channel_hashde_value: string;
}

const initialState: ClickedChannelState = {
  channel_hashde_value: "",
};
export const ClickedChannelSlice = createSlice({
  name: "ClickedChannel",
  initialState,
  reducers: {
    ClickedChannel: (state, action: PayloadAction<string>) => {
      state.channel_hashde_value = action.payload;
    },
  },
});

export const { ClickedChannel } = ClickedChannelSlice.actions;
export default ClickedChannelSlice.reducer;
