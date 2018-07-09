/*global chrome*/


import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BuildIcon from '@material-ui/icons/Build';
import Grid from '@material-ui/core/Grid';

import Switch from '@material-ui/core/Switch';
import Cookies from 'universal-cookie';

import './Popup.css';
const cookies = new Cookies();
class Popup extends Component
{

  constructor(props)
  {
    super(props);
    var cookie_store = cookies.get('store');
    if(cookie_store)
      this.state = cookie_store;
    else{
      this.state = {
        RAW: true,
        DISCRETIZED: false,
        DISCRETIZED_BY_USER: false,
        type: 0
      };
    }
  }


  handleChange = name => event => {
    var state = {}
    var targets = ['RAW', 'DISCRETIZED', 'DISCRETIZED_BY_USER']
    for(var i = 0; i < targets.length; i++){
        this.setState({ [targets[i]]: false});
        state[targets[i]] = false;
    }
    this.setState({[name]: event.target.checked});
    state[name] = event.target.checked;

    if(event.target.checked === true){
      this.setState({type: name});
      state.type = name
    }

    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.sendMessage(tab.id, {store: state}, function response() {
      })
    })
    cookies.set('store', state)

  };

  componentWillReceiveProps(newProps) {
  }


  render(){
    // <div className={"content"}>
    //   <Grid container spacing={24} justify={"space-around"}>
    //     <Typography item xs={20} sm={20} variant="display1" gutterBottom>
    //       QAvMentor
    //     </Typography>
    //     <div item xs={2} sm={2}></div>
    //
    //     <Button item xs={2} sm={2} variant="fab" className={"option-button"} size={"small"} >
    //       <BuildIcon/>
    //     </Button>
    //   </Grid>
    //
    //   <hr/>
    //   <br/>
    //
    //   <Grid container spacing={24} justify={"space-around"}>
    //     <h2 item xs={24} sm={24}>Reputation: New</h2>
    //     <img item xs={24} sm={24} width="420" height="420" src="https://d33wubrfki0l68.cloudfront.net/cc541f9cbdd7e0c8f14c2fde762ff38c00e9d62b/fc921/images/angular/ng2-charts/chart-example.png"/>
    //
    //   </Grid>
    //
    // </div>
    return(
      <div className={"content"} width="420" height="420">
        <Grid container spacing={24} justify={"space-around"}>
          <Typography item xs={20} sm={20} variant="display1" gutterBottom>
            QAvMentor
          </Typography>
          <div item xs={2} sm={2}></div>

          <Button item xs={2} sm={2} variant="fab" className={"option-button"} size={"small"} >
            <BuildIcon/>
          </Button>
        </Grid>

        <hr/>
        <br/>

        <Grid container spacing={24} justify={"space-around"}>
          <Switch
            checked={this.state.RAW}
            onChange={this.handleChange('RAW')}
            value="RAW"
          />
          <Switch
            checked={this.state.DISCRETIZED}
            onChange={this.handleChange('DISCRETIZED')}
            value="DISCRETIZED"
            color="primary"
          />
           <Switch
              checked={this.state.DISCRETIZED_BY_USER}
              onChange={this.handleChange('DISCRETIZED_BY_USER')}
              value="DISCRETIZED_BY_USER"
              color="primary"
            />
        </Grid>
        <Grid container spacing={24} justify={"space-around"}>
          {this.state.type}
        </Grid>
      </div>
    )
  }

  componentDidMount() {

  }

};

export default Popup;
