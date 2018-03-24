import * as R from 'ramda';
import get from '../utils/get';
import initProjects from "../PROJECT_DATA.json";
import updateList from '../utils/updateList';

const initState = {
    isFetching: false,
    data: initProjects
};

export default function list(
        state = initState, 
        action
    ) {
    switch (action.type) {
    case "EDIT_PROJECT":
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
    default:
        return state;
    }
};