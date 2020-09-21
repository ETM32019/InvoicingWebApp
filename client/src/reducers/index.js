import { combineReducers } from "redux";
import alert from "./alert";
import profile from "./profile";
import invoice from "./invoice";
import estimate from "./estimate";
import client from "./client";
import item from "./item";
import auth from "./auth";

export default combineReducers({
  alert,
  profile,
  invoice,
  estimate,
  client,
  item,
  auth
});
