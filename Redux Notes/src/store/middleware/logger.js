// SNA (S => Store, N => Next, A => Action)

const logger =
  (param) => (store) /* ({getSate, dispatch}) */ => (next) => (action) => {
    console.log("Logging", param);
    // console.log("Store", store);
    // console.log("Next", next);
    // console.log("Action", action);
    next(action);
  };

export default logger;
