import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

// Combine Action creator & Reducer
const slice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    // actions => actions handler
    userAdded: (users, action) => {
      users.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { userAdded } = slice.actions;
export default slice.reducer;
