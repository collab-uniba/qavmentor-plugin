import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';




import './App.css';

class App extends Component
{
  constructor(props) {
    console.log('constructor')
    super(props);
    this.timer = null;
    this.state = {
      "attached_to": props.attached_to,
      "my_style": props.my_style,
      "prediction": props.percentage
    };

    this.request =   function()
    {
      console.log('making request from '+ this.props.attached_to)
      var html_question = document.getElementById('wmd-preview')
      var title = document.getElementById('title');
      var tag = document.getElementById('tagnames');


      var html_question_inner = ''
      if(html_question)
        html_question_inner = html_question.innerHTML
      else
        html_question = document.getElementById('wmd-preview')
      var date = new Date()


      this.setState({
        prediction: -1
      })

      axios.post('http://127.0.0.1:5000/analyze',
      {
          "day": (date.getDay()).toString(),
          "hour": (date.getHours()).toString(),
          "body": html_question_inner,
          "title":title.value,
          "tags": tag.value.split(" ")
      })
        .then( (response) => {
            console.log("RESPONSE> "+ response.data.prediction)
            this.setState({
              prediction: parseInt(parseFloat(response.data.prediction)*100)
            })
        })
        .catch( (error) => {
          console.log('request failed, trying again ... ')
          this.request()
        });
    }

  }




  render() {
    var prediction_div
    if(this.state.prediction === -1 || !this.state.prediction)
      prediction_div = (<div><CircularProgress size={30} /><div className="percentage"></div></div>)
    else
      prediction_div = (<div><CircularProgress variant="static" value={ this.state.prediction } size={30} /><div className="percentage">{ this.state.prediction }</div></div>)

    return (
      <div className={"plugin_div_" +this.state.my_style }>

        <div>
            {prediction_div}
        </div>
      </div>

    );
  }




  componentDidMount() {

    window.onload()
    {
      console.log(this.props.attached_to + "  mounted")
      this.request()

      var mounted_on = this.props.attached_to
      var att = document.getElementById(mounted_on)
      att.onkeydown = function()
        {
          console.log("___________keydown on "+mounted_on+"___________")
          clearTimeout(this.timer);
          this.timer = setTimeout(function()
          {
              this.request()

          }.bind(this), 500)
        }.bind(this)
    }

  }


  componentWillUnmount(){
    console.log("unmounting "+ this.props.attached_to)
    clearInterval(this.timer)
  }







}

export default App;
