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
    case "TOGGLE_DETACH_FROM_INSTANCE": {
      return R.merge(state, {
        showForm: !state.showForm,
        data: R.merge(state.data, {
          volumeId: action.volumeId
        })
      });
    }
    case "RESET_DETACH_FROM_INSTANCE":
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
