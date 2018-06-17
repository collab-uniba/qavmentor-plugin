import React, { Component } from 'react';

import PluginPercentage from './PluginPercentage/PluginPercentage';
import TipList from './TipList/TipList';

import Dialog from '@material-ui/core/Dialog';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import store from '../../store';
import {countTipCategory} from '../../utils'

import './PluginTip.css';





function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class PluginTip extends Component
{

  constructor(props) {
    super(props);
    this.timer = null
    this.state = {
      "closed_tips": store.subject.closed_tips || [],
      "attached_to": props.attached_to,
      "my_style": props.my_style,
      "fullScreen": false,
    };



    store.on('change', function(change){
        this.setState({
          closed_tips:store.subject.closed_tips
        })
    }.bind(this))

  }


  handleOpen = () => {
    this.setState({ open: true, fullScreen:!this.state.fullScreen });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    var dialog
    var grid


    if(this.state.fullScreen === true){
      grid = (
        <Grid container >
             <Grid item xs={24}>
               <PluginPercentage className={'plugin_percentage'}/>
             </Grid>

             <Grid item xs={24}
             style={{maxHeight: 500, overflow: 'auto', width: '85%'}} className={'tip-list-container'}>
               <TipList/>
             </Grid>

        </Grid>
      )

      dialog = (
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
          <AppBar className={'app-bar'} >
            <Toolbar style={{padding: '4px'}}>

              <button className={'round-close-button-plugin-tip'} onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </button>
              <div className={'dialog-divider'}></div>
              <div className={'dialog-title'}>
                <Typography variant="title" color="inherit">
                    Overview
                </Typography>
              </div>

            </Toolbar>
          </AppBar>

          <div className={'dialog-content'} >
              {grid}
          </div>
        </Dialog>
      )
    }

    else {
      grid = (
        <Grid container >
             <Grid item xs={24}>
               <PluginPercentage className={'plugin_percentage'}/>
             </Grid>

             <Grid item xs={24}
             style={{maxHeight: 300, overflow: 'auto'}} className={'tip-list-container'}>
               <TipList/>
             </Grid>

        </Grid>
      )

      dialog = (
        <Dialog open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}  className={'dialog-fragment'}>
          <AppBar className={'app-bar'}>
            <Toolbar style={{padding: '4px'}}>

              <button className={'round-close-button-plugin-tip'} onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </button>
              <div className={'dialog-divider'}></div>
              <div className={'dialog-title'}>
                <Typography variant="title" color="inherit">
                    Overview
                </Typography>
              </div>

            </Toolbar>
          </AppBar>

          <div className={'dialog-content'}>
              {grid}
          </div>
        </Dialog>
      )
    }

    var  plugin_button = (
        <React.Fragment>
            <div className={"plugin_div_" +this.state.my_style } onClick={this.handleOpen}>
              <div className={"round_button"}>
                  <div className={'tip-number'}>
                      {countTipCategory(this.props.category, this.state.closed_tips)}
                  </div>
              </div>
            </div>
            {dialog}
        </React.Fragment>
      )

    return (plugin_button);
  }


  componentDidMount() {

  }


  componentWillUnmount(){
  }

}


export default PluginTip;
