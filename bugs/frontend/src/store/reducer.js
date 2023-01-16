import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import usersReducer from "./users";

export default combineReducers({
  entities: entitiesReducer,
  users: usersReducer,
});
