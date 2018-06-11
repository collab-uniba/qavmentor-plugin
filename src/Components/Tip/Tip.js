import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

class Tip extends React.Component {

  constructor(props)
  {
    super(props);
    this.timer = null
    this.state = {
      "current_tip": -1,
      "closed_tips": [],
      "message": "initial message",
      "open": false
    }

    this.request =   function(){
      var html_question = document.getElementById('wmd-preview')
      var title = document.getElementById('title');
      var tag = document.getElementById('tagnames');


      var html_question_inner = ''
      if(html_question)
        html_question_inner = html_question.innerHTML
      else
        html_question = document.getElementById('wmd-preview')
      var date = new Date()


      axios.post('http://127.0.0.1:5000/getTip',
      {
          "day": (date.getDay()).toString(),
          "hour": (date.getHours()).toString(),
          "body": html_question_inner,
          "title":title.value,
          "tags": tag.value.split(" ")
      })
        .then( (response) => {
            if(response.data.length > 0)
            {
              var tip = null
              for (var i = 0; i < response.data.length; i++) {
                 if (!this.state.closed_tips.includes(response.data[i].tip_index))
                  tip = response.data[i]
              }
              if(tip != null)
              {
                this.setState({
                  open:true,
                  message: tip.msg,
                  current_tip: tip.tip_index
                })
              }

            }
        })
        .catch( (error) => {
          if(this.state.n_req_made < this.state.max_req)
          {
            this.state.n_req_made += 1
            this.request()
          }
        });
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
        this.request()
        window.onkeydown = function()
          {
             this.setState({open: false})

            clearTimeout(this.timer);
            this.timer = setTimeout(function()
            {
                this.request()

            }.bind(this), 500)
          }.bind(this)
    }


}

export default (Tip);
