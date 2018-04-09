export const deleteVolume = volume => ({
  type: "DELETE_VOLUME",
  volume,
});

export const createVolume = (volume) => ({
  type: "CREATE_VOLUME",
  volume,
});

export const toggleVolumeForm = (project) => ({
  type: "TOGGLE_VOLUME_FORM",
  project,
});

export const changeVolumeProperty = field => value => ({
  type: "CHANGE_VOLUME_PROPERY",
  change: {
    [field]: value,
  }
})
export const resetVolume = () =>({
  type: "RESET_CREATE_VOLUME"
})

export const toggleAttachToInstance = (volumeId) => ({
  type: "TOGGLE_ATTACH_TO_INSTANCE",
  volumeId,
})
export const toggleDetachFromInstance = (volumeId) => ({
  type: "TOGGLE_DETACH_FROM_INSTANCE",
  volumeId,
})

export const changeInstance = instanceId => ({
  type: "CHANGE_VOLUME_INSTANCE",
  instanceId
})

export const submitAttachToInstance = (volumeId, instanceId) => ({
  type: "SUBMIT_ATTACH_TO_INSTANCE",
  volumeId,
  instanceId
})
export const submitDetachFromInstance = (volumeId, instanceId) => ({
  type: "SUBMIT_DETACH_FROM_INSTANCE",
  volumeId,
  instanceId
})
export const resetAttachToInstance = () => ({
  type: "RESET_ATTACH_TO_INSTANCE"
})
export const resetDetachFromInstance = () => ({
  type: "RESET_DETACH_FROM_INSTANCE"
})