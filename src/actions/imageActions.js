export const addToProject = (image, project) => ({
    type: "ADD_IMAGE_TO_PROJECT",
    image,
    project
});

export const changeImageProject = (project) => ({
    type: "CHANGE_IMAGE_PROJECT",
    project
});

export const toggleAddImageToProject = ( image ) => ({
    type: "TOGGLE_ADD_IMAGE_TO_PROJECT_FORM",
    image,
})

export const resetAddToProject = ( image ) => ({
    type: "RESET_ADD_TO_PROJECT",
})