import * as R from "ramda";
import { get } from "../utils";
import initLinks from "../LINK_DATA.json";

let initState = { isFetching: false, showForm: false, data: initLinks };

export default function list(state = initState, action) {
  switch (action.type) {
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
