import { genUid } from "../utils";
export default store => next => action => {
  if (action.type === "CREATE_INSTANCE") {
    setTimeout(
      () =>
        store.dispatch({
          type: "CREATE_INSTANCE_BUILDING",
          instance: action.instance
        }),
      2000
    );
    setTimeout(() => {
      store.dispatch({
        type: "CREATE_INSTANCE_COMPLETE",
        instance: action.instance
      });
      store.dispatch({
        type: "CREATE_NOTIFICATION",
        notification: {
          id: genUid(),
          type: "LAUNCH",
          status: "succesfull",
          created: new Date(),
          assets: [action.instance.id]
        }
      });
      setTimeout(() => {
        store.dispatch({
          type: "SHOW_NOTIFICATION"
        });
      }, 100);
      setTimeout(() => {
        store.dispatch({
          type: "HIDE_NOTIFICATION"
        });
      }, 5000);
    }, 7000);
  }
  let result = next(action);
  return result;
};
