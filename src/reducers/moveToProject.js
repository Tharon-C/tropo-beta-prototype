import * as R from "ramda";
import { get, genUid } from "../utils";

const initState = () => {
  return {
    showForm: false,
    status: "editing",
    data: {
        oldProject: "",
        newProject: "",
    }
  };
};

export default function list(state = initState(), action) {
  switch (action.type) {
    case "TOGGLE_MOVE_TO_PROJECT_FORM": {
      return R.merge(state, {
        showForm: !state.showForm,
        data: action.data
      });
    }
    case "CHANGE_MOVE_TO_PROJECT":
      return R.merge(state, {
        status: "editing",
        data: R.merge(state.data, { newProject: action.newProject })
      });
    case "RESET_MOVE_TO_PROJECT":
      return initState();

    default:
      return state;
  }
}

// Selectors
export const selectSizeOptions = ({ createImage, providerList }) => {
  if (providerList.data.length <= 0) return;
  let provider = get.byId(createImage.data.provider)(providerList.data);
  let sizes = provider.sizes;
  return sizes.map(item => {
    return {
      children: item.name,
      value: item.id
    };
  });
};
