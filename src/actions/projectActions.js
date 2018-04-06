export const deleteProject = project => ({
  type: "DELETE_PROJECT",
  project,
  list: {
    isDeleting: false
  }
});

export const createProject = project => ({
  type: "CREATE_PROJECT",
  project
});

export const toggleProjectForm = () => ({
  type: "TOGGLE_PROJECT_FORM"
});

export const changeProjectProperty = field => value => ({
  type: "CHANGE_PROJECT_PROPERY",
  change: {
    [field]: value
  }
});

export const resetProject = () => ({
  type: "RESET_CREATE_PROJECT"
});

export const toggleMoveToProject = assetType => (id, oldProject) => ({
  type: "TOGGLE_MOVE_TO_PROJECT_FORM",

  data: {
    assetType,
    assetId: id,
    oldProject,
  }
});

export const confirmMoveToProject = (data) => ({
  type: "CONFIRM_MOVE_TO_PROJECT",
  data
});

export const changeMoveToProject = newProject => ({
  type: "CHANGE_MOVE_TO_PROJECT",
  newProject
});

export const resetMoveToProject = () => ({
  type: "RESET_MOVE_TO_PROJECT"
});
