import * as R from 'ramda';

const get = {

    byId(id) {
        return R.find(R.propEq('id', id));
    },

    indexByAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
};

export default get;

