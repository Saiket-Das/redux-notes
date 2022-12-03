import configureStore from "./store/configureStore";
import { addBugs, loadBugs } from "./store/bugs";

const store = configureStore();

// store.dispatch(loadBugs());
store.dispatch(addBugs({ description: "a" }));

// setTimeout(() => store.dispatch(loadBugs()), 3000);
