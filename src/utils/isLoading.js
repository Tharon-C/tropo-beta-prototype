import * as R from 'ramda';

const dataProp = R.prop("data");
const isEmpty = R.compose(R.isEmpty, dataProp);
const isFetching = R.prop("isFetching");

export const isLoadingList = state =>
    R.and( 
        isEmpty(state),
        isFetching(state)
    );
