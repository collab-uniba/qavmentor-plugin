import React, { Component } from 'react';
// import Tip from './Tip/Tip.js'
//import PluginTip from './PluginTip/PluginTip.js'
import Tip from './PluginTip/Tip.js'
import ReactDOM from 'react-dom';

// import store from '../store';

class App extends Component
{
  //
  // constructor()
  // {
  //   super();
  // }

  render(){return(<div></div>)}



  componentDidMount() {
     const content_id = 'header';
     const content = document.getElementsByTagName(content_id)[0]
     const tip = document.createElement('div');
     tip.id = 'tip';
     content.appendChild(tip);
     ReactDOM.render(<Tip/>, document.getElementById('tip'));
        //in body plugin

        //
        // const body_id = 'wmd-input';
        //
        // const body = document.getElementById(body_id);
        //
        // const plugin_tip_body = document.createElement('div');
        //
        // plugin_tip_body.id = 'plugin_tip_body';
        //
        // body.parentNode.insertBefore(plugin_tip_body, body.nextSibling);
        // ReactDOM.render(<PluginTip attached_to={body_id} my_style={body_id}category={'body'}/>, document.getElementById('plugin_tip_body'));

  }

};

export default App;
