import * as R from 'ramda';
import { get, genUid } from '../utils';

const initState = () => {
    let id = genUid();
    return {
        showForm: false,
        status: "editing",
        data: {
            id,
            name: "New Image",
            provider: "2",
            size: "2",
        }
    }
};

export default function list( state = initState(), action ) {
    switch (action.type) {

    case "TOGGLE_INSTANCE_FORM": {
        return R.merge( state,
            {
               showForm: !state.showForm 
            }
        )
    };
    case "EDIT_INSTANCE":
        return {
            status: "editing",
            data: R.merge( state.data, action.change) 
        }
    case "SUBMIT_INSTANCE":
        return R.merge( state,
            {
                status: "Submitting",
            }
        )
    case "CREATE_INSTANCE_SUCC":
        return {
            status: "Successful",
            data: action.image,
        }
    case "CREATE_INSTANCE_ERR":
        return {
            status: "Error",
            data: action.image,
        }
    case "RESET_INSTANCE":
        return initState();

    default:
        return state;
    }
}

// Selectors
export const selectSizeOptions = ({createImage, providerList}) => {
    if (providerList.data.length <= 0) return;
    let provider = get.byId(createImage.data.provider)( providerList.data);
    let sizes = provider.sizes;
     return sizes.map( item => {
        return {
            children: item.name,
            value: item.id
        }
    });
}
