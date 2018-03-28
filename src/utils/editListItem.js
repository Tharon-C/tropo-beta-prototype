import * as R from 'ramda';

export default R.curry((key, value, change, items) =>
  R.map(R.when(R.propEq(key, value), R.mergeDeepLeft(change)), items)
);

/* 
const items = [
    {name:'Joe', id:'21',good: 'true'},
    {name: 'Pete', id:'22',good:'false'},
]

editListItem(id, 22, {name: "Frank"})(list) 

// [ {name:'Joe', id:'21',good: 'true'}, {name: 'Frank', id:'22',good:'false'},]
*/
