import { addBug } from "../bugs";
import configureStore from "../configureStore";

describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    const store = configureStore();
    const bug = { description: "a" };
    const x = await store.dispatch(addBug(bug));
    console.log("DEBUG", x);
    console.log(store.getState());
  });
});
