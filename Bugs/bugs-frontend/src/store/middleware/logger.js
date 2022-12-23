// SNA (S => Store, N => Next, A => Action)

const logger =
  (param) => (store) /* ({getSate, dispatch}) */ => (next) => (action) => {
    console.log("Logging", param);
    return next(action);
  };

export default logger;
