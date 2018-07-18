import React, { Component } from 'react';

import {getPrediction} from '../../../../services';
import {getPost} from '../../../../utils'
import store from '../../../../store.js'
import { Circle } from 'rc-progress';

import './PluginPercentage.css';


class PluginPercentage extends Component
{

  constructor(props) {
    super(props);
    this.state = {
      "color": props.variant,
      "prediction": -1,
      "type": !store.subject.type ? 0 : store.subject.type
    };

    store.on('change', function(change){
        this.setState({
          type: store.subject.type
        })

    }.bind(this))

  }


  componentWillReceiveProps(newProps) {
      this.setState({color: newProps.variant});
  }


  render() {
    var color = '';
    if(this.state.color === 'success')
      color = '#00A047';
    if(this.state.color === 'warning')
      color = '#FF9A00';
    if(this.state.color === 'error')
      color = '#E41F2F';


    return (
      <div className={'circle-percentage'}>
          <div>
              <Circle percent={this.state.prediction} strokeWidth="5" trailWidth="5" strokeColor={color} width={150} />
              <div className="percentage">{ this.state.prediction } %</div>
          </div>
      </div>
    );
  }


  componentWillMount() {
      getPrediction(getPost(), this.state.type).then(data => { this.setState({prediction: data}) })
    }


  componentWillUnmount(){
  }

}

export default PluginPercentage;
