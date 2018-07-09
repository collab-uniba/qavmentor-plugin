import axios from 'axios';

const stackexchange_api = 'https://api.stackexchange.com/2.2/users/'
const api_url = 'https://90.147.75.125'
const local_url = 'https://localhost'
var n_req_made = 0
var max_req = 100


export function getPrediction(data) {
  var req = axios.post(api_url+'/getPredictionDiscretizedByUser',data)
    .then( (response) => {
          console.log(response.data.prediction)
          return parseInt(parseFloat(response.data.prediction))
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
          console.log(response.data.items[0])

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
          console.log(response.data)
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
