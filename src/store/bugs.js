import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

// Combine Action creator & Reducer
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // actions => actions handler
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id !== action.payload.id);
      bugs[index].resolved = true;
    },
  },
});

export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;

//  Action creator
// export const bugAdded = createAction("bugAdded");
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved");

/* 
Arrow Function (Redux)
    export const bugAdded = description=>({
        type: BUG_ADDED,
        payload: {
          description: description,
    },
})
*/

//  Reducer
// export default createReducer([], {
//   // key: values,
//   // actions: functions (event=> event handler)
//   [bugAdded.type]: (bugs, action) => {
//   },
//   [bugResolved.type]: (bugs, action) => {
//   },
// });
