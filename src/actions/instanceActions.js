
export const deleteInstance = instance => ({
    type: "DELETE_INSTANCE",
    instance,
    list: {
        isDeleting: false
    }
});

export const createInstance = instance => ({
    type: "CREATE_INSTANCE",
    instance,
});

export const toggleInstanceForm = () => (
    {
        type: "TOGGLE_INSTANCE_FORM",
    }
)