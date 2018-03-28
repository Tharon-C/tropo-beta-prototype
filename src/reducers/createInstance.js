import * as R from "ramda";
import { get, genUid } from "../utils";

const initState = () => {
  let id = genUid();
  return {
    showForm: false,
    status: "editing",
    stepIndex: 0,
    data: {
      id,
      progress: 0,
      activity: "Initializing",
      name: "New Instance",
      provider: "MaranaCloud",
      allocationSource: "YourUserName",
      size: "SM1",
      tags: [],
    }
  };
};

export default function list(state = initState(), action) {
  switch (action.type) {
    case "SET_CREATE_INSTANCE_STEP": {
      return R.merge(state, {
        stepIndex: action.step
      });
    }
    case "TOGGLE_INSTANCE_FORM": {
      return R.merge(state, {
        showForm: !state.showForm,
        image: action.image,
        
        stepIndex: action.image ? 1 : 0,
        data: R.merge( state.data , {
            project: action.project,
            name: action.image ? action.image.name : "New Instance",
            tags: action.image ? action.image.tags : [],
        })
      });
    }
    case "CHANGE_INSTANCE_PROPERY":
      return R.merge( state, {
          status: "editing",
          data: R.merge(state.data, action.change)
        });
    
    case "CREATE_INSTANCE":
      return R.merge(state, {
        status: "Submitting"
      });
    case "CREATE_INSTANCE_SUCC":
      return {
        status: "Successful",
        data: action.image
      };
    case "CREATE_INSTANCE_ERR":
      return {
        status: "Error",
        data: action.image
      };
    case "RESET_INSTANCE":
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
