export const deleteInstance = instance => ({
  type: "DELETE_INSTANCE",
  instance,
  list: {
    isDeleting: false
  }
});

export const createInstance = (instance, project) => ({
  type: "CREATE_INSTANCE",
  instance
});

export const toggleInstanceForm = (image, project) => ({
  type: "TOGGLE_INSTANCE_FORM",
  image,
  project
});

export const setStep = step => ({
  type: "SET_CREATE_INSTANCE_STEP",
  step
});

export const changeProperty = field => value => ({
  type: "CHANGE_INSTANCE_PROPERY",
  change: {
    [field]: value
  }
});
export const resetInstance = () => ({
  type: "RESET_INSTANCE"
});

export const toggleAttachFromInstance = instanceId => ({
  type: "TOGGLE_ATTACH_FROM_INSTANCE",
  instanceId
});

export const submitAttachFromInstance = (volumeId, instanceId) => ({
  type: "SUBMIT_ATTACH_FROM_INSTANCE",
  volumeId,
  instanceId
});

export const changeVolume = volumeId => ({
  type: "CHANGE_INSTANCE_VOLUME",
  volumeId
});

export const resetAttachFromInstance = () => ({
  type: "RESET_ATTACH_FROM_INSTANCE"
});

export const removeTagFromInstance = (instanceId, tagId) => ({
  type: "REMOVE_TAG_FROM_INSTANCE",
  instanceId,
  tagId
})