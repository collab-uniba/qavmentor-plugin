import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import store from '../../store';
import {getPrediction} from '../../services';
import {getPost} from '../../utils'

import './PluginButton.css';


class PluginButton extends Component
{

  constructor(props) {
    super(props);
    this.timer = null
    this.state = {
      "attached_to": props.attached_to,
      "my_style": props.my_style,
      "prediction": -1
    };

  }


  render() {
    var prediction_div
    if(this.state.prediction === -1 || !this.state.prediction)
      prediction_div = (<div><CircularProgress size={30} /><div className="percentage"></div></div>)
    else
      prediction_div = (<div><CircularProgress variant="static" value={ this.state.prediction } size={30} /><div className="percentage">{ this.state.prediction }</div></div>)

    var plugin_button
    
    if(this.state.error){
      plugin_button = (
        <div>
          {this.state.error}
        </div>
      )
    }else{
      plugin_button = (
        <div className={"plugin_div_" +this.state.my_style }>
          <div>
              {prediction_div}
          </div>
        </div>
      )
    }
    return (plugin_button);
  }


  componentDidMount() {
      getPrediction(getPost()).then(data => { this.setState({prediction: data}) })
      var mounted_on = this.props.attached_to
      var att = document.getElementById(mounted_on)
      att.onkeydown = function()
      {
        clearTimeout(this.timer);
        this.timer = setTimeout(function()
        {
          getPrediction(getPost()).then(data => { this.setState({prediction: data}) })
        }.bind(this), 500)
      }.bind(this)
  }


  componentWillUnmount(){
    clearInterval(this.timer)
  }

}

export default PluginButton;
