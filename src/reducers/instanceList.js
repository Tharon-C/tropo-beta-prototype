import * as R from 'ramda';
import { get } from '../utils';
import initInstances from "../INSTANCE_DATA.json"; 

let initState =  { isFetching: false, showForm: false, data: initInstances };

export default function list( state = initState, action ) {
    switch (action.type) {
    case "CREATE_INSTANCE":
        return R.merge( state,
            {
                data: R.append(
                    action.instance, state.data.filter(
                        item => item.id !== action.image.id
                    )
                )
            }
        );
    case "DELETE_INSTANCE":
        return R.merge( action.list,
            {   
                data: R.reject(
                    R.propEq( 'id', action.instance ), 
                    state.data
                ),    
            },
        );

    default:
        return state;
    }
}

// Selectors
export const getInstanceList = ( { instanceList, providerList } ) => {
    if (R.isEmpty(providerList.data)) return {isFetching: true, data: []};     

    const image = item => {
        let provider = get.byId( item.provider )(
            providerList.data
        );

        let size = provider ? get.byId(item.size)(
            provider.sizes
        ) : null;

        return R.merge( item, 
            {
                provider: provider.name,
                size: size.name,
            }
        )
    };
    
    const data = instanceList.data.map(image);
    return R.merge( instanceList, { data });
}
