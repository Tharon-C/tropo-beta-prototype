import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import instanceList from "./instanceList";
import projectList from "./projectList";
import volumeList from "./volumeList";
import linkList from "./linkList";
import tagList from "./tagList";
import imageList from "./imageList";
import createInstance from "./createInstance";
import createVolume from "./createVolume";
import createLink from "./createLink";
import createProject from "./createProject";
import addToProject from "./addToProject";
import moveToProject from "./moveToProject";
import attachToInstance from "./attachToInstance";
import attachFromInstance from "./attachFromInstance";
import detachFromInstance from "./detachFromInstance";

export default combineReducers({
  routing: routerReducer,
  imageList,
  instanceList,
  projectList,
  volumeList,
  linkList,
  tagList,
  createInstance,
  createVolume,
  createLink,
  createProject,
  addToProject,
  moveToProject,
  attachToInstance,
  attachFromInstance,
  detachFromInstance,
});
