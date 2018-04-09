import * as R from "ramda";
import { get, editListItem } from "../utils";
import initVolumes from "../VOLUME_DATA.json";
import edit from "material-ui/svg-icons/image/edit";

let initState = { isFetching: false, showForm: false, data: initVolumes };

export default function list(state = initState, action) {
  switch (action.type) {
    case "SUBMIT_ATTACH_FROM_INSTANCE":
    case "SUBMIT_ATTACH_TO_INSTANCE":
      console.log(action)
      return R.merge(state, {
        data: editListItem("id", action.volumeId, {
          instance: action.instanceId
        })(state.data)
      });
    case "SUBMIT_DETACH_FROM_INSTANCE":
      return R.merge(state, {
        data: editListItem("id", action.volumeId, {
          instance: "",
          status: "Detached"
        })(state.data)
      });
    case "CONFIRM_MOVE_TO_PROJECT":
      return action.data.assetType === "volumes"
        ? R.merge(state, {
            data: editListItem("id", action.data.assetId, {
              project: action.data.newProject
            })(state.data)
          })
        : state;
    case "CREATE_VOLUME":
      return R.merge(state, {
        data: R.append(
          action.volume,
          state.data.filter(item => item.id !== action.volume.id)
        )
      });
    case "DELETE_VOLUME":
      return R.merge(action.list, {
        data: R.reject(R.propEq("id", action.volume), state.data)
      });

    default:
      return state;
  }
}
