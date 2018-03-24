export const receiveProviders = data => ({
    type: "RECV_PROVIDER_LIST_SUCC",
    list: {
        isFetching: false,
        data
    }
});

export const receiveProvidersError = message => ({
    type: "RECV_PROVIDER_LIST_ERROR",
    list: {
        isFetching: false,
        data: [],
        error: message
    }
});

export const editProvider = (provider, name) => ({
    type: "EDIT_PROVIDER_NAME",
    isSubmitting: true,
    data: {
        provider,
        name: name,
    }
});

export const editProviderSuccess = provider => ({
    type: "EDIT_PROVIDER_NAME_SUCC",
    isSubmitting: false
});

export const editProviderError = message => ({
    type: "EDIT_PROVIDER_NAME_ERR",
    error: message,
});

export const resetError = message => ({
    type: "RESET_ERR",
    error: message
})
