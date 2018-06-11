import axios from 'axios';

const api_url = 'http://127.0.0.1:5000'
var n_req_made = 0
var max_req = 100


export function getPrediction(data) {
  var request = axios.post(api_url+'/analyze',data)
    .then( (response) => {
          console.log(response.data.prediction)
          return parseInt(parseFloat(response.data.prediction)*100)
        })
    .catch( (error) => {
      if(n_req_made < max_req)
      {
        n_req_made += 1
        getPrediction(data)
      }else Promise.reject(error.response);
    }
  );
  return request

}


export function getTips(data) {
  var request = axios.post(api_url+'/getTip',data)
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
  return request

}
