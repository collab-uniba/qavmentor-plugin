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

import './Dashboard.css';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Dashboard extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      "open": props.open,
      "variant": props.variant
    }
  }

  componentWillReceiveProps(newProps) {
      this.setState({open: newProps.open, variant: newProps.variant});
  }

  handleOpen = () => {
    this.setState({ open: true});
  };

  handleClose = () => {
    this.setState({ open: false});
    this.props.toggleDashboard(false);
  };


  render(){
    var dialog
    var grid

    grid = (
      <Grid container >
           <Grid item xs={24}>
             <PluginPercentage className={'plugin_percentage'} variant={this.state.variant}/>
           </Grid>

           <Grid item xs={24}
           style={{maxHeight: 300, overflow: 'auto'}} className={'tip-list-container'}>
             <TipList/>
           </Grid>

      </Grid>
    )

    dialog = (
      <Dialog open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}  className={'dialog-fragment'}>
        <AppBar className={'app-bar-'+this.state.variant}>
          <Toolbar style={{padding: '4px'}}>

            <button className={'round-close-button-plugin-tip-'+this.state.variant} onClick={this.handleClose} aria-label="Close">
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

    return(dialog)
  }

  componentDidMount() {
  }

};

export default Dashboard;
