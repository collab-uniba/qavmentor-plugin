import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


window.onload = function()
{
  const body = document.getElementsByTagName('body')[0];
  const qavmentor_app = document.createElement('div');
  qavmentor_app.id = 'qavmentor-root';
  body.appendChild(qavmentor_app);
  ReactDOM.render(<App/>, document.getElementById('qavmentor-root'));
}
