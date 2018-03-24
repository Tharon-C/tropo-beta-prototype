import {
    receiveInstanceSuccess,
    receiveInstanceError,
    newInstanceSuccess,
    newInstanceError,
    deleteInstanceError,
    deleteInstanceSuccess,
} from './instanceActions';
import {
    receiveProviders,
    receiveProvidersError,
    editProvider,
    editProviderSuccess,
    editProviderError,
} from './providerActions';

const _resetSuccess = () => ({ type: "RESET_DATA_SUCC" });

const _resetError = message => ({
    type: "RESET_ERR",
    error: message
})

export const resetData = () => ({ type: "RESET_DATA" });

export const updateImageList = () => ({ 
    type: "FETCHING_IMAGE_LIST",
    list: {
        isFetching: true
    }
});

export const deleteImage = image => ({
    type: "DELETE_IMAGE",
    image,
    list: {
        isDeleting: true,   
    }
});

export const updateProviderList = () => ({ 
        type: "FETCHING_PROVIDER_LIST",
        list: {
            isFetching: true
        }
    })

export const editProviderName = (provider, name) => {
    return editProvider(provider, name)
};
    

export const editNewImage = (field, change) => ({
    type: 'EDIT_IMAGE',
    change: {
        [field]: change.target.value
    }
})

export const submitNewImage = image => {
    let tempImage = R.merge(image, {isSubmitting: true});

    return { type: "SUBMIT_IMAGE" }
};

export const createInstance = ({ 
    type: "CREATE_IMAGE",
    image: tempImage,
});

export const resetCreateInstance = () => ({
    type: "RESET_IMAGE"
});
