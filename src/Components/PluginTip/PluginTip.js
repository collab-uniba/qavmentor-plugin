import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import {getTips} from '../../services';
import {getPost} from '../../utils'
import {getPrediction} from '../../services';

import store from '../../store';
import {countTipCategory} from '../../utils'
import Dashboard from './Dashboard/Dashboard.js'
import Badge from './Badge'

import './PluginTip.css';


const low_percentage = 20;
const medium_percentage = 50;
//const high_percentage = 50;
const low_msg = "low";
const medium_msg = "medium";
const high_msg = "high";


class PluginTip extends Component
{

  constructor(props) {
    super(props);
    this.timer = null
    this.state = {
      "tips_count": 0,
      "attached_to": props.attached_to,
      "my_style": props.my_style,
      "alert_type": "error",
      "dashboard_open": false,
      "type": !store.subject.type ? 0 : store.subject.type
    };

    store.on('change', function(change){
      console.log('changing store....')
        this.setState({
          type: store.subject.type
        })
    }.bind(this))

  }

  componentWillReceiveProps(newProps) {
      this.setState({attached_to: newProps.attached_to});
  }


  toggleDashboard = (on_off) => {
    this.setState({dashboard_open: on_off});
  };

  openDashboard = () => {
    this.setState({dashboard_open: true});
  };


  render() {

    return(
      <div id='plugin-container' className={"plugin_div_" +this.state.my_style }>
        <div onClick={this.openDashboard}>
          <Badge badgeContent={this.state.tips_count} color={this.state.alert_type}/>
        </div>

        <Dashboard open={this.state.dashboard_open}
         variant={this.state.alert_type}
         toggleDashboard={this.toggleDashboard.bind(this)}/>
     </div>
   );

  }


  componentDidMount() {
    //gets executed when the element gets created
    getPrediction(getPost(), this.state.type).then(data => {
      if(data<low_percentage)
        this.setState({alert_type: "error"})

      if(data>=low_percentage && data<medium_percentage)
        this.setState({alert_type: "warning"})

      if(data>=medium_percentage)
        this.setState({ alert_type: "success"})
    });

    getTips(getPost()).then(data => {
      this.setState({"tips_count": countTipCategory('actionable', data)});
    });
    var textarea = document.getElementById('wmd-input');
    var textarea_box = textarea.getBoundingClientRect();
    var container = document.getElementById('plugin-container')
    container.style.left = (textarea_box.width - 35)+'px',
    container.style.top = (textarea_box.height + 35)+'px'


    //executes the same things above when certain events occur
    window.addEventListener('resize', function(event){
      var textarea = document.getElementById('wmd-input');
      var textarea_box = textarea.getBoundingClientRect();
      var container = document.getElementById('plugin-container')

      container.style.left = (textarea_box.width - 35)+'px',
      container.style.top = (textarea_box.height + 35)+'px'
    });

    window.onkeydown = function()
    {
      clearTimeout(this.timer);
      this.timer = setTimeout(function()
      {
        getPrediction(getPost(), this.state.type).then(data => {
          if(data<low_percentage)
            this.setState({alert_type: "error"})
          if(data>=low_percentage && data<medium_percentage)
            this.setState({alert_type: "warning"})
          if(data>=medium_percentage)
            this.setState({ alert_type: "success"})
        });

        getTips(getPost()).then(data => {
          this.setState({"tips_count": countTipCategory('actionable', data)});
        });

      }.bind(this), 1000)
    }.bind(this)

  }


  componentWillUnmount(){
  }

}


export default PluginTip;
