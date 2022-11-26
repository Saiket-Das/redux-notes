import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugAssignToUser,
  unresolvedBugsSelector,
  getBugsByUserSelector,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

// const unsubscribe = store.subscribe(() => {
//   console.log("Store changed", store.getState());
// });

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));

store.dispatch(bugAssignToUser({ bugId: 2, userId: 1 }));

store.dispatch(userAdded({ name: "Saiket Das" }));
store.dispatch(userAdded({ name: "Ahan Bryan" }));

store.dispatch(
  projectAdded({
    name: "UniFood react native",
  })
);
// unsubscribe();

const unresolvedBugs = unresolvedBugsSelector(store.getState());
const getBugsByUser = getBugsByUserSelector(1)(store.getState());

console.log("Current state", store.getState());
console.log("Unresolved Bugs", unresolvedBugs);
console.log("Get bugs by User", getBugsByUser);
