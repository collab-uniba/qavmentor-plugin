import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import {getPrediction} from '../../../services';
import {getPost} from '../../../utils'

import './PluginPercentage.css';


class PluginPercentage extends Component
{

  constructor(props) {
    super(props);
    this.state = {
      "prediction": -1
    };

  }


  render() {
    var prediction_div
    if(this.state.prediction === -1 || !this.state.prediction)
    prediction_div = (
      <div>
          <CircularProgress color={'#dcdcdc'} variant="static" value={100} size={200} />
          <div className="percentage">__</div>
          <CircularProgress className={'top-percentage'} size={200} />
      </div>
    )
    else
      prediction_div = (
        <div>
            <CircularProgress color={'#dcdcdc'} variant="static" value={100} size={200} />
            <div className="percentage">{ this.state.prediction }</div>
            <CircularProgress className={'top-percentage'} variant="static" value={ this.state.prediction } size={200} thickness={5} />
        </div>
      )

    var plugin_button

    if(this.state.error){
      plugin_button = (
        <div>
          {this.state.error}
        </div>
      )
    }else{
      plugin_button = (
        <div>
          {prediction_div}
        </div>
      )
    }
    return (plugin_button);
  }


  componentDidMount() {
      getPrediction(getPost()).then(data => { this.setState({prediction: data}) })
    }


  componentWillUnmount(){
  }

}

export default PluginPercentage;
