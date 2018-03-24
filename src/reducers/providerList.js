import * as R from 'ramda';
import get from '../utils/get';
import updateList from '../utils/updateList';

const initState = {
    isFetching: false,
    data: []
};

export default function list(
        state = initState, 
        action
    ) {
    switch (action.type) {
    case "FETCHING_PROVIDER_LIST":
        return R.merge( state, action.list)
    case "RECV_PROVIDER_LIST_SUCC":
        return action.list;
    case "RECV_PROVIDER_LIST_ERROR":
        return action.list
    case "EDIT_PROVIDER_NAME":
        return R.merge( state,
            {   
                isSubmitting: true,
                data: updateList.name(
                    action.data.name, 
                    action.data.provider, 
                    state.data
                ), 
            }
        ) 
    case "EDIT_PROVIDER_NAME_SUCC":
        return R.merge( state,
            {
                isSubmitting: false
            }
        );
    default:
        return state;
    }
};

// Selectors
export const selectProviderOptions = (state) => 
    state.providerList.data.map( item => {
        return {
            children: item.name,
            value: item.id,
        }
    });
