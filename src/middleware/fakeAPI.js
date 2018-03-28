export default store => next => action => {
  if (action.type === "CREATE_INSTANCE") {
    setTimeout( () => 
        store.dispatch({
        type: "CREATE_INSTANCE_BUILDING",
        instance: action.instance
        }), 2000)
    setTimeout( () => 
        store.dispatch({
        type: "CREATE_INSTANCE_COMPLETE",
        instance: action.instance
        }), 7000)
  };
  let result = next(action)
  return result;
};
