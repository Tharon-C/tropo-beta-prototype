export const deleteInstance = instance => ({
  type: "DELETE_INSTANCE",
  instance,
  list: {
    isDeleting: false
  }
});

export const createInstance = (instance, project) => ({
  type: "CREATE_INSTANCE",
  instance,
});

export const toggleInstanceForm = (image, project) => ({
  type: "TOGGLE_INSTANCE_FORM",
  image,
  project,
});

export const setStep = step => ({
  type: "SET_CREATE_INSTANCE_STEP",
  step
});

export const changeProperty = field => value => ({
  type: "CHANGE_INSTANCE_PROPERY",
  change: {
    [field]: value,
  }
})
export const resetInstance = () =>({
  type: "RESET_INSTANCE"
})