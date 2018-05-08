import { merge } from "ramda";
const initState = {
  sidebarOpen: true,
  showNotification: false
};

export default function appState(state = initState, action) {
  switch (action.type) {
    case "CLOSE_SIDEBAR":
      return merge(state, {
        sidebarOpen: false
      });
    case "OPEN_SIDEBAR":
      return merge( state, {
        sidebarOpen: true
      });
    case "SHOW_NOTIFICATION":
    return merge( state, {
        showNotification: true
    }); 
    case "HIDE_NOTIFICATION":
    return merge( state, {
        showNotification: false
    }); 
    default:
      return state;
  }
}
