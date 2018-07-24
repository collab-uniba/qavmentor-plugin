import React, { Component } from 'react';

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
      <React.Fragment>
        <div className={"plugin_div_" +this.state.my_style } onClick={this.openDashboard}>
          <Badge badgeContent={this.state.tips_count} color={this.state.alert_type}/>
        </div>

        <Dashboard open={this.state.dashboard_open}
         variant={this.state.alert_type}
         toggleDashboard={this.toggleDashboard.bind(this)}/>
     </React.Fragment>
   );

  }


  componentDidMount() {
    getPrediction(getPost(), 'DISCRETIZED_BY_USER').then(data => {
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

    window.onkeydown = function()
    {
      clearTimeout(this.timer);
      this.timer = setTimeout(function()
      {
        getPrediction(getPost(), 'DISCRETIZED_BY_USER').then(data => {
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
