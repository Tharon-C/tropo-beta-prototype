import * as R from "ramda";
import { get, genUid } from "../utils";

const initState = () => {
  let id = genUid();
  return {
    showForm: false,
    status: "editing",
    data: {
      id,
      name: "New Link",
      description: "",
      summary: "",
      url: "",
      tags: []
    }
  };
};

export default function list(state = initState(), action) {
  switch (action.type) {
    case "TOGGLE_LINK_FORM": {
      return R.merge(state, {
        showForm: !state.showForm,
        data: R.merge(state.data, {
          project: action.project ? action.project.id : ""
        })
      });
    }
    case "CHANGE_LINK_PROPERY":
      return R.merge(state, {
        status: "editing",
        data: R.merge(state.data, action.change)
      });
    case "CREATE_LINK":
      return R.merge(state, {
        status: "Submitting"
      });
    case "RESET_CREATE_LINK":
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
