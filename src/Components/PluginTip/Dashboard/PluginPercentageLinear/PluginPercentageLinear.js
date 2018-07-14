import React, { Component } from 'react';
import { Line } from 'rc-progress';
import Grid from '@material-ui/core/Grid';

import {getPrediction} from '../../../../services';
import {getPost} from '../../../../utils'
import store from '../../../../store.js'

import './PluginPercentageLinear.css'

class PluginPercentageLinear extends Component
{
    constructor(props) {
      super(props);
      this.state = {
        "variant": props.variant,
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
        this.setState({variant: newProps.variant});
    }


    render() {
      var variant = '';
      if(this.state.variant === 'success')
        variant = '#00A047';
      if(this.state.variant === 'warning')
        variant = '#FF9A00';
      if(this.state.variant === 'error')
        variant = '#E41F2F';


      return(
        <div className={'line-percentage'}>
          <div style={{fontSize: 'large'}} >
            <Line percent={this.state.prediction} strokeWidth="2" trailWidth="2" strokeColor={variant} width={500} />
              { this.state.prediction } %
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

export default PluginPercentageLinear;
