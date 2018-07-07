var observe = require('observe')
const _store = {};
var store = observe(_store)
store.set('modified', [])
store.set('user', {})
export default store;
