import * as R from "ramda";
import { get, genUid } from "../utils";

const initState = () => {
  return {
    showForm: false,
    status: "editing",
    data: {
      volumeId: "",
      instanceId: ""
    }
  };
};

export default function list(state = initState(), action) {
  switch (action.type) {
    case "TOGGLE_ATTACH_TO_INSTANCE": {
      return R.merge(state, {
        showForm: !state.showForm,
        data: R.merge(state.data, {
          volumeId: action.volumeId,
          instance: action.instanceId,
        })
      });
    }
    case "CHANGE_VOLUME_INSTANCE":
      return R.merge(state, {
        status: "editing",
        data: R.merge(state.data, { instanceId: action.instanceId })
      });
    case "RESET_ATTACH_TO_INSTANCE":
      return initState();

    default:
      return state;
  }
}