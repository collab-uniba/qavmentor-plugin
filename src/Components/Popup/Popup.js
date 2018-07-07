import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BuildIcon from '@material-ui/icons/Build';
import Grid from '@material-ui/core/Grid';

import './Popup.css';

class Popup extends Component
{

  constructor(props)
  {
    super(props);

  }

  componentWillReceiveProps(newProps) {
  }


  render(){
    return(
      <div className={"content"}>
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
          <h2 item xs={24} sm={24}>Reputation: New</h2>
          <img item xs={24} sm={24} width="420" height="420" src="https://d33wubrfki0l68.cloudfront.net/cc541f9cbdd7e0c8f14c2fde762ff38c00e9d62b/fc921/images/angular/ng2-charts/chart-example.png"/>

        </Grid>

      </div>
    )
  }

  componentDidMount() {

  }

};

export default Popup;
