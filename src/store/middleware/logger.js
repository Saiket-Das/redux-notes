// SNA (S => Store, N => Next, A => Action)

const logger = (store) /* ({getSate, dispatch}) */ => (next) => (action) => {
  console.log("store", store);
  console.log("next", next);
  console.log("action", action);
  next(action);
};

export default logger;
