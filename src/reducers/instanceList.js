import * as R from "ramda";
import { get, editListItem } from "../utils";
import initInstances from "../INSTANCE_DATA.json";

let initState = { isFetching: false, showForm: false, data: initInstances };

export default function list(state = initState, action) {
  switch (action.type) {
    case "SUBMIT_ATTACH_FROM_INSTANCE":
    case "SUBMIT_ATTACH_TO_INSTANCE":
      return R.merge(state, {
        data: editListItem("id", action.instanceId, {
          volumes: [
            action.volumeId,
            ...get.byId(action.instanceId)(state.data).volumes
          ]
        })(state.data)
      });
    case "SUBMIT_DETACH_FROM_INSTANCE":
      return R.merge(state, {
        data: state.data.map(instance =>
          R.merge(instance, {
            volumes: R.reject(R.equals(action.volumeId), instance["volumes"])
          })
        )
      });
    case "CONFIRM_MOVE_TO_PROJECT":
      return action.data.assetType === "instances"
        ? R.merge(state, {
            data: editListItem("id", action.data.assetId, {
              project: action.data.newProject
            })(state.data)
          })
        : state;
    case "CREATE_INSTANCE_BUILDING":
      return R.merge(state, {
        data: editListItem("id", action.instance.id, { progress: 80 })(
          state.data
        )
      });
    case "CREATE_INSTANCE_COMPLETE":
      return R.merge(state, {
        data: editListItem("id", action.instance.id, {
          progress: 100,
          activity: "Active"
        })(state.data)
      });
    case "CREATE_INSTANCE":
      return R.merge(state, {
        data: R.append(
          action.instance,
          state.data.filter(item => item.id !== action.instance.id)
        )
      });
    case "DELETE_INSTANCE":
      return R.merge(action.list, {
        data: R.reject(R.propEq("id", action.instance), state.data)
      });
    case "REMOVE_TAG_FROM_INSTANCE":
      return R.merge(state, {
        data: state.data.map(instance => {
          if (instance.id === action.instanceId) {
            return R.merge(instance, {
              tags: R.reject(R.propEq("id", action.tagId), instance["tags"])
            });
          }
          return instance;
        })
      });

    default:
      return state;
  }
}

// Selectors
export const getInstanceList = ({ instanceList, providerList }) => {
  if (R.isEmpty(providerList.data)) return { isFetching: true, data: [] };

  const image = item => {
    let provider = get.byId(item.provider)(providerList.data);

    let size = provider ? get.byId(item.size)(provider.sizes) : null;

    return R.merge(item, {
      provider: provider.name,
      size: size.name
    });
  };

  const data = instanceList.data.map(image);
  return R.merge(instanceList, { data });
};
