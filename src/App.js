import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component
{
  constructor(props) {
    super(props);

    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      "attached_to": props.attached_to,
      "prediction": "-"
    };

    var html_question = document.getElementById('wmd-preview')
    var title = document.getElementById('title');
    var tag = document.getElementById('tagnames');
    this.interval = setInterval(() => {
      var html_question_inner = ''
      if(html_question)
        html_question_inner = html_question.innerHTML
      else
        html_question = document.getElementById('wmd-preview')
      var date = new Date()

      axios.post('http://127.0.0.1:5000/analyze',
      {
          "day": (date.getDay()).toString(),
          "hour": (date.getHours()).toString(),
          "body": html_question_inner,
          "title":title.value,
          "tags": tag.value.split(" ")
      })
        .then( (response) => {
          this.setState({
              prediction: parseInt(parseFloat(response.data.prediction)*100)
          });
        })
        .catch( (error) => {
          // console.log(error);
        });
    }, 500);
  }


    handleMouseHover(){
      this.setState(this.toggleHoverState);
    }

    toggleHoverState(state) {
      return {
        isHovering: !state.isHovering,
      };
    }
    //
    // CodeSnippet: { this.state.CodeSnippet }, BodyLength: { this.state.BodyLength }, TitleLength: { this.state.TitleLength },
    //                        SentimentScore: { this.state.SentimentScore }, Ntag: { this.state.Ntag }, AvgUpperCharsPPost: { this.state.AvgUpperCharsPPost },
    //                        url: { this.state.url }, WeekDay: {this.state.Weekday}, DayTime: {this.state.GMTHour}

    // {this.state.isHovering && <div>CodeSnippet: { this.state.CodeSnippet }, BodyLength: { this.state.BodyLength }, TitleLength: { this.state.TitleLength },
    //                        SentimentScore: { this.state.SentimentScore }, Ntag: { this.state.Ntag }, AvgUpperCharsPPost: { this.state.AvgUpperCharsPPost },
    //                        url: { this.state.url }, WeekDay: {this.state.Weekday}, DayTime: {this.state.GMTHour} </div>}

    // {!this.state.isHovering && <div>{ this.state.prediction }</div>}


  render() {

    return (
      <div className={"plugin_div_" +this.state.attached_to }
                       onMouseEnter={this.handleMouseHover}
                       onMouseLeave={this.handleMouseHover}>


        <div className="round_button" href="">
          { this.state.prediction }

        </div>
      </div>

    );
  }


  componentDidMount() {



    // setInterval( () => {
    //
    //
    // },1000)
  }


  componentWillUnmount(){
    console.log("clearing interval")
    clearInterval(this.interval)
  }

}

export default App;
