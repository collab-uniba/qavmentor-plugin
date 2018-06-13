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
              //fullScreen
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
            >
              <AppBar className={styles.appBar}>
                <Toolbar>
                  <button className={'round-close-button'}>
                    <CloseIcon onClick={this.handleClose} aria-label="Close"/>
                  </button>
                  <Typography variant="title" color="inherit" className={styles.flex}>
                    Sound
                  </Typography>

                </Toolbar>
              </AppBar>
              <List>
                <ListItem button>
                  <ListItemText primary="Phone ringtone" secondary="Titania" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                </ListItem>
              </List>
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
