import React, { Component } from 'react';

import PluginPercentage from './PluginPercentage/PluginPercentage';
import PluginPercentageLinear from './PluginPercentageLinear/PluginPercentageLinear';
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
      "value": 0,
      "type": !store.subject.type ? 0 : store.subject.type
    };

    store.on('change', function(change){
        this.setState({
          type: store.subject.type
        })

    }.bind(this))
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
    var opt1
    var opt2
    var title = ''

    if(!this.state.type || this.state.type === 'RAW' || this.state.type === 'DISCRETIZED')
      title = 'Probability that your question will have a useful answer';
    if(this.state.type === 'DISCRETIZED_BY_USER')
      title = 'Question completeness';

    opt1 = (
      <React.Fragment>
      <Typography variant="headline" align={'center'} gutterBottom>
           {title}
         </Typography>
        <Grid container className={'plugin_percentage'}>
            <PluginPercentage  variant={this.state.variant}/>
        </Grid>
        <Typography variant="headline" align={'center'} gutterBottom>
           Tips to improve your question
         </Typography>
         <Divider/>
        <TipList/>
      </React.Fragment>
    )

    opt2 = (
      <React.Fragment>
        <Typography variant="headline" align={'center'} gutterBottom>
           {title}
         </Typography>
        <Grid container >
          <PluginPercentageLinear variant={this.state.variant}/>
        </Grid>
          <Typography variant="headline" align={'center'} gutterBottom>
            Tips to improve your question
          </Typography>
         <Divider/>
        <TipList/>
      </React.Fragment>
    )

    dialog = (
      <Dialog
       open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition} >

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


        <div className={'dialog-content'}>
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
          >
            <Tab label="Mockup 1" />
            <Tab label="Mockup 2"  />
          </Tabs>
          {this.state.value===0 ? opt1 : null}
          {this.state.value===1 ? opt2 : null}
        </div>
      </Dialog>
    )

    return(dialog)
  }

  componentDidMount() {

  }

};

export default Dashboard;
