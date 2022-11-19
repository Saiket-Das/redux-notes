//  ------------- REDUX FUNDAMENTALS -------------

import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

store.dispatch(actions.bugAdded("Bug 1"));
store.dispatch(actions.bugAdded("Bug 2"));
store.dispatch(actions.bugAdded("Bug 3"));
store.dispatch(actions.bugResolved(1));

// unsubscribe();

// store.dispatch({
//   type: actions.BUG_REMOVED,
//   payload: {
//     id: 1,
//   },
// });

console.log("Current state", store.getState());

//  ------------- BUILDING REDUX FROM SCRATCH -------------

// import store from "./store/customStore";
// import * as actions from "./store/actions";

// // Notify user that what chnaged
// store.subscribe(() => {
//   console.log("Store changed", store.getState());
// });

// // Changing state
// store.dispatch(actions.bugAdded("Bug 1"));

// // Get current state
// console.log("Current state", store.getState());
