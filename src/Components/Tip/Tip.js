import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import store from '../../store';
import {getTips} from '../../services';
import {getPost} from '../../utils'

import './Tip.css';


class Tip extends React.Component {

  constructor(props) {
    super(props);
    this.timer = null
    this.state = {
      "current_tip_index": -1,
      "current_tip": {},
      "message": "initial message",
      "open": false
    }

  }


  handleClick = () => {
    this.setState({ open: true });
  };


  handleClose = () => {
    this.setState({ open: false });
    store.get('closed_tips_index').push(this.state.current_tip_index)
    store.get('closed_tips').push(this.state.current_tip)
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
              <button className={'round-close-button-tip'} onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </button>
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
           if (!store.subject.closed_tips_index.includes(data[i].index))
              tip = data[i]
        }
        if(tip != null)
        {
          this.setState({
            open:true,
            message: tip.msg,
            current_tip_index: tip.index,
            current_tip: tip
          })
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
               if (!store.subject.closed_tips_index.includes(data[i].index))
                tip = data[i]
            }
            if(tip != null)
            {
              this.setState({
                open:true,
                message: tip.msg,
                current_tip_index: tip.index,
                current_tip: tip
              })
            }

          }
        })
      }.bind(this), 1000)
    }.bind(this)
  }

}

export default (Tip);
