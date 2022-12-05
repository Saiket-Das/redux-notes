import configureStore from "./store/configureStore";
import { addBugs, assignBugToUser, loadBugs, resolveBug } from "./store/bugs";

const store = configureStore();

// UI Layer
store.dispatch(loadBugs());

setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);
