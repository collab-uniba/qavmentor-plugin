import axios from 'axios';

const stackexchange_api = 'https://api.stackexchange.com/2.2/users/'
const api_url = 'https://qavmentor.uniba.it'

var n_req_made = 0
var max_req = 100



export function getPrediction(data,type) {
  var endpoint = '';
  if(type === 0 || type === 'RAW' || !type)
    endpoint = '/getPrediction/raw';
  if(type === 1 || type === 'DISCRETIZED')
    endpoint = '/getPredictionDiscretized';
  if(type === 2 || type === 'DISCRETIZED_BY_USER')
    endpoint = '/getPrediction/discretized';

  var req = axios.post(api_url+endpoint,data)
    .then( (response) => {
          return parseInt(parseFloat(response.data.prediction), 10);
        })
    .catch( (error) => {
      if(n_req_made < max_req)
      {
        n_req_made += 1
        getPrediction(data)
      }else Promise.reject(error.response);
    }
  );
  return req
}



export function getSOUser(id) {
  var req = axios.get(stackexchange_api+id+'?site=stackoverflow')
    .then( (response) => {
          return response.data.items[0]
        })
    .catch( (error) => {
      if(n_req_made < max_req)
      {
        n_req_made += 1
        getSOUser(id)
      }else Promise.reject(error.response);
    }
  );
  return req
}



export function getTips(data) {
  var req = axios.post(api_url+'/getTip',data)
    .then( (response) => {
          return response.data
        })
    .catch( (error) => {
      if(n_req_made < max_req)
      {
        n_req_made += 1
        getPrediction(data)
      }else Promise.reject(error.response);
    }
  );
  return req
}



export function getExplanation(about) {
  var req = axios.get(api_url+'/getExplanation/'+about)
    .then( (response) => {
          return response.data
        })
    .catch( (error) => {
      if(n_req_made < max_req)
      {
        n_req_made += 1
        getExplanation(about)
      }else Promise.reject(error.response);
    }
  );
  return req
}
