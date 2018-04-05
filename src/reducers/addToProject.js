import * as R from "ramda";
import { get, genUid } from "../utils";

const initState = () => {
  return {
    showForm: false,
    status: "editing",
    data: {
        image: "",
        project: "",
    }
  };
};

export default function list(state = initState(), action) {
  switch (action.type) {
    case "TOGGLE_ADD_IMAGE_TO_PROJECT_FORM": {
      return R.merge(state, {
        showForm: !state.showForm,
        data: R.merge(state.data, {
          image: action.image,
          project: action.project
        })
      });
    }
    case "CHANGE_IMAGE_PROJECT":
      return R.merge(state, {
        status: "editing",
        data: R.merge(state.data, { project: action.project })
      });
    case "RESET_ADD_TO_PROJECT":
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
