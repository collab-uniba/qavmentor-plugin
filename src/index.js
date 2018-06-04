import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const question_body = document.getElementById('wmd-input');
const title = document.getElementById('title');

const plugin_button = document.createElement('div');

plugin_button.id = 'root';



question_body.onfocus = function()
{
  // make_request()
  question_body.parentNode.insertBefore(plugin_button, question_body.nextSibling);
  ReactDOM.render(<App attached_to="wmd-input" my_style="body"/>, document.getElementById('root'));
}

question_body.onblur = function()
{
  console.log("unmounting body")
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}


title.onfocus = function()
{
  // make_request()
  title.parentNode.insertBefore(plugin_button, title.nextSibling);
  if(document.getElementById('question-suggestions').childNodes.length == 1)
    ReactDOM.render(<App attached_to="title" my_style="title" /> , document.getElementById('root'));
  else
    ReactDOM.render(<App attached_to="title" my_style="title_suggestion" /> , document.getElementById('root'));

}

title.onblur = function()
{
  console.log("unmounting title")
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}



window.onload = function() {
  // make_request()

  const tags = document.getElementsByClassName("tag-editor")[0].childNodes[1]
  tags.id = 'tags'


  tags.onfocus = function()
  {
    // make_request()
    tags.parentNode.insertBefore(plugin_button, tags.nextSibling);
    if(document.getElementById('question-suggestions').childNodes.length == 1)
      ReactDOM.render(<App attached_to="tags" my_style="tags" /> , document.getElementById('root'));
    else
      ReactDOM.render(<App attached_to="tags" my_style="tags" /> , document.getElementById('root'));

  }

  tags.onblur = function()
  {
    console.log("unmounting tags")
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  }

};
