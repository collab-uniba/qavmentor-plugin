
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BuildIcon from '@material-ui/icons/Build';
import Grid from '@material-ui/core/Grid';

import './Popup.css';

class Popup extends Component
{

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

      </div>
    )
  }


};

export default Popup;
