import React, { Component } from 'react';

import { getPrediction } from '../../../../services';
import { getPost } from '../../../../utils'
import store from '../../../../store.js'
import { Circle } from 'rc-progress';

import './PluginPercentage.css';


class PluginPercentage extends Component
{

  constructor(props) {
    super(props);
    this.state = {
      "prediction": -1,
      "type": props.type,
      "marginLeft": props.marginLeft
    };


  }


  componentWillReceiveProps(newProps) {
      this.setState({type:newProps.type, marginLeft: newProps.marginLeft});
  }


  render() {
    const low_percentage = 20;
    const medium_percentage = 50;
    var color = '';
    if(this.state.prediction > medium_percentage)
      color = '#00A047';
    if(this.state.prediction >= low_percentage && this.state.prediction < medium_percentage)
      color = '#FF9A00';
    if(this.state.prediction < low_percentage)
      color = '#E41F2F';


    var percentage = (
        <div >
            <Circle percent={this.state.prediction} strokeWidth="5" trailWidth="5"
             strokeColor={color} width={150} style={{marginLeft:this.state.marginLeft+'%'}}/>
            <div className="percentage">{ this.state.prediction } %</div>
        </div>

    );

    var prediction = this.state.prediction
    return (<div style={{alignItems: 'center'}}>{prediction!==-1 ? percentage : null} </div>);
  }


  componentWillMount() {
      getPrediction(getPost(), this.state.type).then(data => { this.setState({prediction: data}) })
    }


  componentWillUnmount(){
  }

}

export default PluginPercentage;
