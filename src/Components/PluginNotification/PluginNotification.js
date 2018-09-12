import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

import QuestionImprovementDialog from './QuestionImprovementDialog/QuestionImprovementDialog.js'

import {getPost, startAnalyzing, countFoundTip} from '../../utils'
import {getPrediction, getTips} from '../../services';

import './PluginNotification.css';

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, action, ...other } = props;
  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message} style={{fontSize: '15px'}}>
          {message}
        </span>
      }
      action={action}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});




const low_percentage = 20;
const medium_percentage = 50;

class PluginNotification extends Component {
  constructor()
  {
    super();
    this.timer = null;

    this.state = {
      open: false,
      alert_type: "error",
      dashboard_open: false,
      tag_focus: false
    };
  }


  handleClose = () => {
    this.setState({open: false});
  };

  toggleQuestionImprovementDialog = (on_off) => {
    this.setState({dashboard_open: on_off, open:true });
  };

  openQuestionImprovementDialog = () => {
    this.setState({dashboard_open: true, open: false});
  };

  tick(){
      if(startAnalyzing()&&this.state.tag_focus&&!this.state.dashboard_open)
      {
        getPrediction(getPost(), 'DISCRETIZED_BY_USER').then(data => {
          if(data<low_percentage)
            this.setState({alert_type: "error"})

          if(data>=low_percentage && data<medium_percentage)
            this.setState({alert_type: "warning"})

          if(data>=medium_percentage)
            this.setState({alert_type: "success"})

          this.setState({open:true})

        });
        getTips(getPost()).then(data => {
          this.setState({"tips_count": countFoundTip(data)});
        });
      }else{
        this.setState({open:false})
      }
  }


  render() {
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.state.alert_type}
            message={"You have "+this.state.tips_count + " new tip(s)"}
            action={
              <button className={'round-close-button-tip-'+this.state.alert_type}
                      onClick={this.openQuestionImprovementDialog}>
                  Show
              </button>
            }
          />
        </Snackbar>
        <QuestionImprovementDialog open={this.state.dashboard_open} variant={this.state.alert_type} toggleQuestionImprovementDialog={this.toggleQuestionImprovementDialog.bind(this)}/>
     </React.Fragment>
    );
  }


  componentDidMount() {
    var tags = document.getElementsByClassName('tag-editor')[0].childNodes[1];

    tags.onfocus = function()
    {
      this.setState({tag_focus: true})
    }.bind(this)

    window.onclick = function()
    {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.tick(), 500);

    }.bind(this)

    window.onkeydown = function()
    {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.tick(), 500);

    }.bind(this)
  }
}



PluginNotification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(PluginNotification);
