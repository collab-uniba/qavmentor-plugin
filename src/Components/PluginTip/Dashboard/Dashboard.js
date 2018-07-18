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

    // if(!this.state.type || this.state.type === 'RAW' || this.state.type === 'DISCRETIZED')
    //   title = 'Probability of getting useful answer';
    // if(this.state.type === 'DISCRETIZED_BY_USER')
    //   title = 'Closeness to maximum improvement';


    dialog = (
      <Dialog
       open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>

        <AppBar className={'app-bar-'+this.state.variant}>
          <Toolbar>

            <button className={'round-close-button-plugin-tip-'+this.state.variant} onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </button>

            <div>
              <Typography variant="title" color="inherit" align={'center'}>
                  Improve your question
              </Typography>
            </div>

          </Toolbar>
        </AppBar>

        <div>
          <Grid container alignContent={'space-between'} className={'dialog-content'}>
            <Grid item className={'circle-percentage'}>
              <PluginPercentage type={'DISCRETIZED_BY_USER'} variant={this.state.variant}/>
            </Grid>
            <Grid item className={'circle-percentage'}>
              <PluginPercentage type={'RAW'} variant={this.state.variant}/>
            </Grid>


          </Grid>

          <Typography variant="headline" align={'center'} gutterBottom>
             Tips to improve your question
          </Typography>
          <Divider/>

          <TipList/>
        </div>

      </Dialog>
    )

    return(dialog)
  }

  componentDidMount() {
  }

};

export default Dashboard;
