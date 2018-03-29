export const deleteLink = link => ({
  type: "DELETE_LINK",
  link,
  list: {
    isDeleting: false
  }
});

export const createLink = (link) => ({
  type: "CREATE_LINK",
  link,
});

export const toggleLinkForm = (project) => ({
  type: "TOGGLE_LINK_FORM",
  project,
});

export const changeLinkProperty = field => value => ({
  type: "CHANGE_LINK_PROPERY",
  change: {
    [field]: value,
  }
})
export const resetLink = () =>({
  type: "RESET_CREATE_LINK"
})