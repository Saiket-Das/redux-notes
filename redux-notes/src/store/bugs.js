import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

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
      bugs.lastFetch = Date.now();
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

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  console.log("Moment", diffInMinutes);

  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: bugRequested.type,
      onSuccess: bugReceived.type,
      onError: bugRequesteFailed.type,
    })
  );
};

// export const loadBugs = () =>
//   apiCallBegan({
//     url,
//     onStart: bugRequested.type,
//     onSuccess: bugReceived.type,
//     onError: bugRequesteFailed.type,
//   });

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
