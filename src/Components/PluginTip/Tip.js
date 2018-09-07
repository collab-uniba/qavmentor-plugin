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

import {getPost, startAnalyzing, countFoundTip} from '../../utils'
import {getPrediction, getTips} from '../../services';
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
  //<Icon className={classNames(classes.icon, classes.iconVariant)} />
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

class Tip extends React.Component {
  state = {
    open: false,
    alert_type: "error",
    dashboard_open: false,
    tag_focus: false
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

  tick(){
    getTips(getPost()).then(data => {
      this.setState({"tips_count": countFoundTip(data)});
    });
    var tags = document.getElementsByClassName('tag-editor')[0].childNodes[1];
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
          console.log('opening')

        });

      }else{
        console.log('closing')
        this.setState({open:false})
      }

    tags.onfocus = function(){
      this.setState({tag_focus: true})
      }.bind(this)
    // tags.onblur = function(){
    //   this.setState({tag_focus: false})
    //   }.bind(this)
  }

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
            message={"You have "+this.state.tips_count + " new tip(s)"}
            action={
              <button className={'round-close-button-tip-'+this.state.alert_type}
                      onClick={this.openDashboard}>
                  Show
              </button>
            }
          />
        </Snackbar>
        <Dashboard open={this.state.dashboard_open} variant={this.state.alert_type} toggleDashboard={this.toggleDashboard.bind(this)}/>
     </React.Fragment>
    );
  }


  componentDidMount() {
      this.interval = setInterval(() => this.tick(), 500);

      // var review = document.getElementsByClassName("js-wz-progress--active")[0];
      // if(review.innerHTML==="Review")


    }
}




Tip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(Tip);
