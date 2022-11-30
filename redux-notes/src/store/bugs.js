import { createSlice } from "@reduxjs/toolkit";
import { bgYellow } from "colors";
import { createSelector } from "reselect";

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
        // userId =
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },

    bugAssignToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },
  },
});

// Selector function & Memoizing Selectors with Reselect
export const unresolvedBugsSelector = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUserSelector = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

export default slice.reducer;
export const { bugAdded, bugResolved, bugAssignToUser } = slice.actions;
