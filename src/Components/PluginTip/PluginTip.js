import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

import store from '../../store';

import './PluginTip.css';



const styles = theme => ({
  paper: {
    top: 50,
    left: 50,
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});



function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class PluginTip extends Component
{

  constructor(props) {
    super(props);
    this.timer = null
    this.state = {
      "closed_tips": store.subject.tips || [],
      "attached_to": props.attached_to,
      "my_style": props.my_style,
    };


    const styles = {
      appBar: {
        position: 'relative',
      },
      flex: {
        flex: 4,
      },
    };


    store.on('change', function(change){
        this.setState({
          closed_tips:store.subject.tips
        })
    }.bind(this))

  }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    var  plugin_button = (
        <React.Fragment>
            <div className={"plugin_div_" +this.state.my_style } onClick={this.handleOpen}>
              <div className={"round_button"}>
                  {this.state.closed_tips.length}
              </div>
            </div>

            <Dialog
              // fullScreen
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
            >
              <AppBar className={styles.appBar}>
                <Toolbar style={{padding: '4px'}}>

                  <button className={'round-close-button-plugin-tip'} onClick={this.handleClose} aria-label="Close">
                    <CloseIcon />
                  </button>
                  <div className={'dialog-divider'}></div>
                  <div className={'dialog-title'}>
                    <Typography variant="title" color="inherit" className={styles.flex}>
                        Overview
                    </Typography>
                  </div>

                </Toolbar>
              </AppBar>
              <div className={'dialog-content'}>
                <Paper  elevation={4}>
                  <Typography variant="headline" component="h3">
                    This is a sheet of paper.
                  </Typography>
                  <Typography component="p">
                    Paper can be used to build surface or other elements for your application.
                  </Typography>
                </Paper>
              </div>
            </Dialog>
        </React.Fragment>
      )

    return (plugin_button);
  }


  componentDidMount() {

  }


  componentWillUnmount(){
  }

}



PluginTip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PluginTip);
