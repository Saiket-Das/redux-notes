import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

let lastId = 0;

// Combine Action creator & Reducer
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  }, // initialState: []
  reducers: {
    // actions => actions handler
    bugRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugRequesteFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        // userId =
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssignToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
  },
});

export default slice.reducer;
export const {
  bugAdded,
  bugResolved,
  bugAssignToUser,
  bugReceived,
  bugRequested,
  bugRequesteFailed,
} = slice.actions;

// Action Creators
const url = "/bugs";
export const loadBugs = () =>
  apiCallBegan({
    url,
    onStart: bugRequested.type,
    onSuccess: bugReceived.type,
    onError: bugRequesteFailed.type,
  });

// Selector function & Memoizing Selectors with Reselect
export const getUnresolvedBugsSelector = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUserSelector = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
