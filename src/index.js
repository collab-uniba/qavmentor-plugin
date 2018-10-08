import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';
import Popup from './Components/Popup/Popup';

import {getSOUser} from './services.js';
import store from './store'

import {getPost} from './utils.js'
import {savePost, getQuestionID} from './services.js'

import './index.css';


window.onload = function()
{
  //loads the popup page
  try{
    ReactDOM.render(<Popup/>, document.getElementById('root'));
  }catch(Error){}

  //searches for the reputation value of the user and saves it to the store (global var)
  try{
    var usr = document.getElementsByClassName("my-profile js-gps-track")[0]
    var usr_id = usr.href.replace("https://stackoverflow.com/users/", "").split("/")[0]
    getSOUser(usr_id).then(data => {
        store.set("user", data)

        //loads the content page part of the plugin
        const body = document.getElementsByTagName('body')[0];
        const qavmentor_app = document.createElement('div');
        qavmentor_app.id = 'qavmentor-root';
        body.appendChild(qavmentor_app);
        ReactDOM.render(<App/>, document.getElementById('qavmentor-root'));
    });

    var submit_button = document.getElementById("submit-button");
    submit_button.onclick = function()
    {
      var post = getPost();
      post["user_id"] = usr_id;
      window.onbeforeunload = function(){
          getQuestionID(usr_id).then(lastQ => {
            if (lastQ["items"].length > 0){
              var last_post = lastQ["items"][0];
              if(last_post["post_type"] === "question"){
                post["question_id"] = last_post["post_id"];
                savePost(post).then(response => {

                });
              }

            }

          })
      };

    }


  }catch(Error){ }
}
