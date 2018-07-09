/*global chrome*/
import Cookies from 'universal-cookie';
const cookies = new Cookies();

var observe = require('observe')

var _store = {};
var cookie_store = cookies.get('store');
console.log(cookie_store)

var store = observe(_store)
if(cookie_store)
  store.subject = cookie_store;
// store.set('modified', [])
// store.set('user', {})
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('receveing store ')
  console.log(request.store)
  if(request.store) {
    for (var k in request.store){
      if (request.store.hasOwnProperty(k)) {
        store.set(k, request.store[k]);
      }
    }
  }
  console.log(store.subject)
  cookies.set('store', store.subject, { path: '/questions/ask' })
});

store.on('change', function(change){
  console.log("saving cookies")
  console.log(store.subject)
  cookies.set('store', store.subject, { path: '/questions/ask' })

})
export default store;


// chrome.storage.local.set({key: value}, function() {
//   console.log('Value is set to ' + value);
// });
//
// chrome.storage.local.get(['key'], function(result) {
//   console.log('Value currently is ' + result.key);
// });
