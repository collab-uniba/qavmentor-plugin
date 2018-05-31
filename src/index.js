import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Get the element to prepend our app to from https://www.google.com.
// This could be a specific element on a website or something more general like `document.body`.
const question_body = document.getElementById('wmd-input');
const title = document.getElementById('title');

// Create a div to render the App component to.
const app = document.createElement('div');

// Set the app element's id to `root`.
// This name is the same as the element that create-react-app renders to by default
// so it will work on the development server too.
app.id = 'root';

// Prepend the App to the viewport element in production if it exists on the page.
// You could also use `appendChild` depending on your needs.

// Render the App.
question_body.onfocus = function()
{
  question_body.parentNode.insertBefore(app, question_body.nextSibling);
  ReactDOM.render(<App attached_to="body"/>, document.getElementById('root'));
}

question_body.onblur = function()
{
  console.log("unmounting body")
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}


title.onfocus = function()
{
  title.parentNode.insertBefore(app, title.nextSibling);
  ReactDOM.render(<App attached_to="title"/>, document.getElementById('root'));
}

title.onblur = function()
{
  console.log("unmounting title")
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}
