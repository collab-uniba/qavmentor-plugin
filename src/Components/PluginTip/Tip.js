import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import {getPost, startAnalyzing} from '../../utils'
import {getPrediction} from '../../services';
import Dashboard from './Dashboard/Dashboard.js'

import './Tip.css';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

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
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
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
//const high_percentage = 50;
const low_msg = "low";
const medium_msg = "medium";
const high_msg = "high";


class Tip extends React.Component {
  state = {
    open: false,
    alert_type: "error",
    dashboard_open: false
  };


  handleClose = () => {
    this.setState({open: false});
  };

  toggleDashboard = (on_off) => {
    this.setState({dashboard_open: on_off, open:true });
  };

  openDashboard = () => {
    this.setState({dashboard_open: true, open: false});
  };


  render() {
    const { classes } = this.props;

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
            message={this.state.msg}
            action={
              <button className={'round-close-button-tip-'+this.state.alert_type}
                      onClick={this.openDashboard}>
                  Go to Dashboard
              </button>
            }
          />
        </Snackbar>
        <Dashboard open={this.state.dashboard_open} variant={this.state.alert_type} toggleDashboard={this.toggleDashboard.bind(this)}/>
     </React.Fragment>
    );
  }

  componentDidMount() {
      // var review = document.getElementsByClassName("js-wz-progress--active")[0];
      // if(review.innerHTML==="Review")
      document.onclick = function()
      {

        if(startAnalyzing())
        {
          console.log('analyzing')
          getPrediction(getPost(), 'DISCRETIZED_BY_USER').then(data => {
            if(data<low_percentage)
              this.setState({msg: low_msg, alert_type: "error"})

            if(data>=low_percentage && data<medium_percentage)
              this.setState({msg: medium_msg, alert_type: "warning"})

            if(data>=medium_percentage)
              this.setState({msg: high_msg, alert_type: "success"})

            this.setState({open:true})
          });

          window.onkeydown = function()
          {

            clearTimeout(this.timer);
            this.timer = setTimeout(function()
            {
              getPrediction(getPost(), 'DISCRETIZED_BY_USER').then(data => {
                if(data<low_percentage)
                  this.setState({msg: low_msg, alert_type: "error"})

                if(data>=low_percentage && data<medium_percentage)
                  this.setState({msg: medium_msg, alert_type: "warning"})

                if(data>=medium_percentage)
                  this.setState({msg: high_msg, alert_type: "success"})

                this.setState({open:true})
              });
            }.bind(this), 1000)
          }.bind(this)
          if(this.state.dashboard_open===false)
            this.setState({open:true})
        }else{
          this.setState({open:false})
        }
      }.bind(this)



      document.onkeydown = function()
      {

        if(startAnalyzing())
        {
          console.log('analyzing')
          getPrediction(getPost(), 'DISCRETIZED_BY_USER').then(data => {
            if(data<low_percentage)
              this.setState({msg: low_msg, alert_type: "error"})

            if(data>=low_percentage && data<medium_percentage)
              this.setState({msg: medium_msg, alert_type: "warning"})

            if(data>=medium_percentage)
              this.setState({msg: high_msg, alert_type: "success"})

            this.setState({open:true})
          });

          window.onkeydown = function()
          {

            clearTimeout(this.timer);
            this.timer = setTimeout(function()
            {
              getPrediction(getPost(), 'DISCRETIZED_BY_USER').then(data => {
                if(data<low_percentage)
                  this.setState({msg: low_msg, alert_type: "error"})

                if(data>=low_percentage && data<medium_percentage)
                  this.setState({msg: medium_msg, alert_type: "warning"})

                if(data>=medium_percentage)
                  this.setState({msg: high_msg, alert_type: "success"})

                this.setState({open:true})
              });
            }.bind(this), 1000)
          }.bind(this)
          if(this.state.dashboard_open===false)
            this.setState({open:true})
        }else{
          this.setState({open:false})
        }
      }.bind(this)
    }

}




Tip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(Tip);
