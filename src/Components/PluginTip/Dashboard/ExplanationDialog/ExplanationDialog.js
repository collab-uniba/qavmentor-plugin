import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Help } from '@material-ui/icons';

import { getExplanation } from '../../../../services'

import './ExplanationDialog.css';



class ExplanationDialog extends Component
{

  constructor(props) {
      super(props);
      this.state = {
        open: false,
        about: props.about,
        title:'title',
        body:'body',
      }
      console.log(this.state.about)
  };


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    return (
      <div>
        <button className="help-button"  align={'center'} onClick={this.handleOpen}>
          <Help/>
        </button>
        <Dialog
          fullScreen={false}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              I understand
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


  componentWillMount() {
    getExplanation(this.state.about).then(data => {this.setState({title:data.title, body:data.body})})
  }


  componentWillUnmount(){

  }

}


export default ExplanationDialog;
