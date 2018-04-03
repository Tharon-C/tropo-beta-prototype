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
    case "ADD_IMAGE_TO_PROJECT": 
    return R.merge(state, {
      data: editListItem("id", action.project, {
        images: [
          ...get.byId(action.project)(state.data).images,
          action.image
        ]
      })(state.data)
    });
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
        case "CREATE_VOLUME":
      return action.volume.project
        ? R.merge(state, {
            data: editListItem("id", action.volume.project, {
              volumes: [
                ...get.byId(action.volume.project)(state.data).volumes,
                action.volume.id
              ]
            })(state.data)
          })
        : state;
        case "CREATE_LINK":
      return action.link.project
        ? R.merge(state, {
            data: editListItem("id", action.link.project, {
              links: [
                ...get.byId(action.link.project)(state.data).links,
                action.link.id
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
      case "CREATE_PROJECT":
      return R.merge(state, {
        data: R.append(
          action.project,
          state.data.filter(item => item.id !== action.project.id)
        )
      });
    case "DELETE_PROJECT":
      return R.merge(action.list, {
        data: R.reject(R.propEq("id", action.link), state.data)
      });
    default:
      return state;
  }
}
