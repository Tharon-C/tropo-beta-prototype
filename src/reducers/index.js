import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import instanceList from "./instanceList";
import projectList from "./projectList";
import volumeList from "./volumeList";
import linkList from "./linkList";
import tagList from "./tagList";
import imageList from "./imageList";
import createInstance from "./createInstance";

export default combineReducers({
  routing: routerReducer,
  imageList,
  instanceList,
  projectList,
  volumeList,
  linkList,
  tagList,
  createInstance
});
