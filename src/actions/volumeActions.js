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