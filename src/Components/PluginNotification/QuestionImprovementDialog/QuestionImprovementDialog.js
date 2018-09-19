import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';

import PluginPercentage from './PluginPercentage/PluginPercentage';
import TipList from './TipList/TipList';
import ExplanationDialog from './ExplanationDialog/ExplanationDialog';

import './QuestionImprovementDialog.css';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class QuestionImprovementDialog extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      "open": props.open,
      "explanation_open": false,
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
    this.props.toggleQuestionImprovementDialog(false);
  };


  render(){
    const raw_color = '#0077d2';
    const discretized_color = '#FF9A00';

    var dialog_content = (
      <React.Fragment>
        <Grid container alignContent={'space-between'} wrap='nowrap'>

          <Grid item className={'circle-percentage'}>
            <ExplanationDialog about={"percentage_improvements"}/>

            <PluginPercentage type={'DISCRETIZED'} marginLeft={'8'} color={discretized_color}/>
            <DialogContentText >
              <Typography  align={'center'} style={{marginTop: '-15%'}}>
                Closeness to maximum improvement
              </Typography>
            </DialogContentText>
          </Grid>

          <Grid item className={'circle-percentage'}>
            <ExplanationDialog about={"probability_usefull_answer"}/>

            <PluginPercentage type={'RAW'} marginLeft={'6'} color={raw_color}/>

            <DialogContentText >
              <Typography  align={'center'} style={{marginTop: '-15%'}} >
                Probability of getting a useful answer
              </Typography>
            </DialogContentText>
          </Grid>

        </Grid>

        <Typography variant="headline" align={'center'} gutterBottom>
           Tips to improve your question
        </Typography>
        <Divider/>

        <TipList/>
      </React.Fragment>

    )

      var dialog = (
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
          {dialog_content}
        </DialogContent>

      </Dialog>
    )

    return(dialog)
  }

};

export default QuestionImprovementDialog;
