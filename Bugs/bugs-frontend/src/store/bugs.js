import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";
import axios from "axios";

import { apiCallBegan } from "./api";

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
      bugs.list.push(action.payload);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssignToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
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
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: bugRequested.type,
      onSuccess: bugReceived.type,
      onError: bugRequesteFailed.type,
    })
  );
};

export const addBug = async (bug) => {
  try {
    const response = await axios.post(url, bug);
    dispatch(bugAdded(bug));
  } catch {
    dispatch({ type: "error" });
  }
};

// export const addBug = (bug) =>
//   apiCallBegan({
//     url,
//     method: "post",
//     data: bug,
//     onSuccess: bugAdded.type,
//   });

export const resolveBug = (id) =>
  apiCallBegan({
    // PATCH /bugs/1
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    // PATCH /bugs/1
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignToUser.type,
  });

// ---- Selector function & Memoizing Selectors with Reselect
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

// export const loadBugs = () =>
//   apiCallBegan({
//     url,
//     onStart: bugRequested.type,
//     onSuccess: bugReceived.type,
//     onError: bugRequesteFailed.type,
//   });
