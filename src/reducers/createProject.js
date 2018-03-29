import * as R from "ramda";
import { get, genUid } from "../utils";

const initState = () => {
  let id = genUid();
  return {
    showForm: false,
    status: "editing",
    data: {
      id,
      name: "New Project",
      description: "",
      instances: [],
      volumes:[],
      links: [],
      images: [],
      summary: "",
      tags: [],
    }
  };
};

export default function list(state = initState(), action) {
  switch (action.type) {
    case "TOGGLE_PROJECT_FORM": {
      return R.merge(state, {
        showForm: !state.showForm,
      });
    }
    case "CHANGE_PROJECT_PROPERY":
      return R.merge(state, {
        status: "editing",
        data: R.merge(state.data, action.change)
      });
    case "CREATE_PROJECT":
      return R.merge(state, {
        status: "Submitting"
      });
    case "RESET_CREATE_PROJECT":
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
