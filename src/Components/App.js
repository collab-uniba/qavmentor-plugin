import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PluginNotification from './PluginNotification/PluginNotification.js'


class App extends Component
{

  render(){return(<div></div>)}



  componentDidMount() {
     const content_id = 'header';
     const content = document.getElementsByTagName(content_id)[0]
     const tip = document.createElement('div');
     tip.id = 'tip';
     content.appendChild(tip);
     ReactDOM.render(<PluginNotification/>, document.getElementById('tip'));
  }

};

export default App;
