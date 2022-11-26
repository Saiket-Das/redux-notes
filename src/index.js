//  ------------- REDUX FUNDAMENTALS -------------

import configureStore from "./store/configureStore";
import { bugAdded, bugResolved, unresolvedBugsSelector } from "./store/bugs";
import { projectAdded } from "./store/projects";

const store = configureStore();

// const unsubscribe = store.subscribe(() => {
//   console.log("Store changed", store.getState());
// });

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(
//   projectAdded({
//     name: "UniFood react native",
//   })
// );

// unsubscribe();

const unresolvedBugs = unresolvedBugsSelector(store.getState());

console.log("Current state", store.getState());

console.log("UnresolvedBugs", unresolvedBugs);

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
