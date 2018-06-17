var observe = require('observe')
const _store = {};
var store = observe(_store)
store.set('closed_tips_index', [])
store.set('closed_tips', [])
store.set('modified', [])
export default store;
