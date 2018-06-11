import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import store from '../../store';
import {getTips} from '../../services';
import {getPost} from '../../utils'

class Tip extends React.Component {

  constructor(props) {
    super(props);
    this.timer = null
    this.state = {
      "current_tip": -1,
      "closed_tips": [],
      "message": "initial message",
      "open": false
    }

  }


  handleClick = () => {
    this.setState({ open: true });
  };


  handleClose = () => {
    this.setState({ open: false });
    this.state.closed_tips.push(this.state.current_tip)
  };


  render() {
    const vertical = "bottom"
    const horizontal = "right"
    return (
          <Snackbar
            open={this.state.open}
            anchorOrigin={{ vertical, horizontal }}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'snackbar-fab-message-id',
            }}
            message={<span id="snackbar-fab-message-id">{"TIP: "+this.state.message}</span>}
            action={
              <Button onClick={this.handleClose}>
                close
              </Button>
            }
          />
    );
  }


  componentDidMount() {
    getTips(getPost()).then(data => {
      if(data.length > 0)
      {
        var tip = null
        for (var i = 0; i < data.length; i++) {
           if (!this.state.closed_tips.includes(data[i].tip_index))
            tip = data[i]
        }
        if(tip != null)
        {
          this.setState({
            open:true,
            message: tip.msg,
            current_tip: tip.tip_index
          })
          store.tips = this.state.closed_tips
        }

      }
    })

    window.onkeydown = function()
    {
       this.setState({open: false})

      clearTimeout(this.timer);
      this.timer = setTimeout(function()
      {
        getTips(getPost()).then(data => {
          if(data.length > 0)
          {
            var tip = null
            for (var i = 0; i < data.length; i++) {
               if (!this.state.closed_tips.includes(data[i].tip_index))
                tip = data[i]
            }
            if(tip != null)
            {
              this.setState({
                open:true,
                message: tip.msg,
                current_tip: tip.tip_index
              })
              store.tips = this.state.closed_tips
            }

          }
        })
      }.bind(this), 500)
    }.bind(this)
  }

}

export default (Tip);
