var observe = require('observe')
const _store = {};
var store = observe(_store)
store.set('tips', [])
export default store;
