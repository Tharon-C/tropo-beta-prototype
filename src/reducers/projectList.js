import * as R from "ramda";
import { editListItem } from "../utils";
import get from "../utils/get";
import initProjects from "../PROJECT_DATA.json";
import updateList from "../utils/updateList";
import edit from "material-ui/svg-icons/image/edit";

const initState = {
  isFetching: false,
  data: initProjects
};

export default function list(state = initState, action) {
  switch (action.type) {
    case "CREATE_INSTANCE":
      return action.instance.project
        ? R.merge(state, {
            data: editListItem("id", action.instance.project.id, {
              instances: [
                ...get.byId(action.instance.project.id)(state.data).instances,
                action.instance.id
              ]
            })(state.data)
          })
        : state;
    case "EDIT_PROJECT":
      return R.merge(state, {
        isSubmitting: true,
        data: updateList.name(
          action.data.name,
          action.data.provider,
          state.data
        )
      });
    default:
      return state;
  }
}
