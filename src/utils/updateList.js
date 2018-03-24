import * as R from 'ramda';

const nameLens = R.lens(R.prop('name'), R.assoc('name'));
const changeName = R.set(nameLens); 

const updateList = {
    name: (name, item, arr) => R.update(
        R.indexOf(item, arr), 
        changeName(name, item),
        arr
    )
}

export default updateList
