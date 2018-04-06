import * as R from "ramda";
import { get, editListItem } from "../utils";
import initLinks from "../LINK_DATA.json";

let initState = { isFetching: false, showForm: false, data: initLinks };

export default function list(state = initState, action) {
  switch (action.type) {
    case "CONFIRM_MOVE_TO_PROJECT":
    return action.data.assetType === "links"
      ? R.merge(state, {
          data: editListItem("id", action.data.assetId, {
            project: action.data.newProject
          })(state.data)
        })
      : state;
    case "CREATE_LINK":
      return R.merge(state, {
        data: R.append(
          action.link,
          state.data.filter(item => item.id !== action.link.id)
        )
      });
    case "DELETE_LINK":
      return R.merge(action.list, {
        data: R.reject(R.propEq("id", action.link), state.data)
      });

    default:
      return state;
  }
}
