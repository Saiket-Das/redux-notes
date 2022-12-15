import "./App.css";

import configureStore from "./store/configureStore";

import Bugs from "./components/Bugs";
import BugsList from "./components/BugsList";

import { Provider } from "react-redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BugsList />
      {/* <Bugs /> */}
    </Provider>
  );
}

export default App;
