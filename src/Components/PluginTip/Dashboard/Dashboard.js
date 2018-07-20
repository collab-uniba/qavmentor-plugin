import React, { Component } from 'react';

import PluginPercentage from './PluginPercentage/PluginPercentage';
import TipList from './TipList/TipList';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


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

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Dashboard.css';

import store from '../../../store.js';

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
      "variant": props.variant,
    };

  }

  componentWillReceiveProps(newProps) {
      this.setState({open: newProps.open, variant: newProps.variant});
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleOpen = () => {
    this.setState({ open: true});
  };

  handleClose = () => {
    this.setState({ open: false});
    this.props.toggleDashboard(false);
  };


  render(){
    var dialog
    var raw
    var normalized
    var title = ''

    dialog = (
      <Dialog
       open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition} >

        <AppBar className={'app-bar-'+this.state.variant}>
          <Toolbar>
            <button className={'round-close-button-plugin-tip-'+this.state.variant} onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </button>
            <Typography variant="display1" color="inherit" align={'center'}>
                Improve your question
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className={'dialog-content'} >
          <Grid container alignContent={'space-between'} wrap='nowrap'>

            <Grid item className={'circle-percentage'}>
              <PluginPercentage type={'DISCRETIZED_BY_USER'} marginLeft={'8'}/>
              <DialogContentText >
                <Typography  align={'center'} style={{marginTop: '-15%'}}>
                  Closeness to maximum improvement
                </Typography>
              </DialogContentText>
            </Grid>

            <Grid item className={'circle-percentage'}>
              <PluginPercentage type={'RAW'} marginLeft={'6'}/>
              <DialogContentText >
                <Typography   align={'center'} style={{marginTop: '-15%'}} >
                  Probability of getting useful answer
                </Typography>
              </DialogContentText>
            </Grid>

          </Grid>

          <Typography variant="headline" align={'center'} gutterBottom>
             Tips to improve your question
          </Typography>
          <Divider/>

          <TipList/>
        </DialogContent>

      </Dialog>
    )

    return(dialog)
  }

  componentDidMount() {
  }

};

export default Dashboard;
