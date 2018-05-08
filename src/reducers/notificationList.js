import * as R from "ramda";
import { get, editListItem } from "../utils";
const initNotifications = [
  {
    id: "351d-9dbf-a0b1a9a56a2bc-7319cec7-b538",
    type: "LAUNCH",
    created: "2018-05-08T21:04:33.509Z",
    status: "success",
    assets: [
      "7319cec7-b538-351d-9dbf-a0b1a9a56a2bc",
      "013c4440-0c0d-4b2c-b92a-58deb4df134e"
    ],
  }
];

let initState = { isFetching: false, data: initNotifications };

export default function list(state = initState, action) {
  switch (action.type) {
    case "CREATE_NOTIFICATION":
      return R.merge(state, {
        data: R.append(
          action.notification,
          state.data.filter(item => item.id !== action.notification.id)
        )
      });
    case "DELETE_NOTIFICATION":
      return R.merge(action.list, {
        data: R.reject(R.propEq("id", action.instance), state.data)
      });
    default:
      return state;
  }
}
