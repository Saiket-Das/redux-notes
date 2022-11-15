import store from "./store/store";
import { bugAdded, bugResolved } from "./store/actions";

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugResolved(1));

// unsubscribe();

// store.dispatch({
//   type: actions.BUG_REMOVED,
//   payload: {
//     id: 1,
//   },
// });

console.log("Current state", store.getState());
