export const deleteProject = project => ({
  type: "DELETE_PROJECT",
  project,
  list: {
    isDeleting: false
  }
});

export const createProject = (project) => ({
  type: "CREATE_PROJECT",
  project,
});

export const toggleProjectForm = () => ({
  type: "TOGGLE_PROJECT_FORM",
});

export const changeProjectProperty = field => value => ({
  type: "CHANGE_PROJECT_PROPERY",
  change: {
    [field]: value,
  }
})
export const resetProject = () =>({
  type: "RESET_CREATE_PROJECT"
})