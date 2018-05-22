import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component
{
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
    };
  }


    handleMouseHover()
    {
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
  render() {

    return (
      <div className="plugin_div"
                       onMouseEnter={this.handleMouseHover}
                       onMouseLeave={this.handleMouseHover}>


        <a  href="">
                 {!this.state.isHovering && <div>80</div>}
                 {this.state.isHovering && <div>CodeSnippet: { this.state.CodeSnippet }, BodyLength: { this.state.BodyLength }, TitleLength: { this.state.TitleLength },
                                        SentimentScore: { this.state.SentimentScore }, Ntag: { this.state.Ntag }, AvgUpperCharsPPost: { this.state.AvgUpperCharsPPost },
                                        url: { this.state.url }, WeekDay: {this.state.Weekday}, DayTime: {this.state.GMTHour} </div>}
        </a>
      </div>

    );
  }


  componentDidMount() {

    var html_question = document.getElementById('wmd-preview')
    var title = document.getElementById('title');
    var tag = document.getElementById('tagnames');

    setInterval( () => {

      var html_question_inner = ''
      if(html_question)
        html_question_inner = html_question.innerHTML
      else
        html_question = document.getElementById('wmd-preview')

      var date = new Date()

      axios.post('http://127.0.0.1:5000/analyze', {
                                                    "day": (date.getDay()).toString(),
                                                    "hour": (date.getHours()).toString(),
                                                    "body": html_question_inner,
                                                    "title":title.value,
                                                    "tags": tag.value.split(" ")
                                                  })
        .then( (response) => {
          var global_sentiment = ''
          Object.keys(response.data.SentimentScore).forEach(function (key)
          {
             if(response.data.SentimentScore[key]===true)
              global_sentiment = key
          });

          this.setState({

          		CodeSnippet: response.data.CodeSnippet.toString(),
          		BodyLength: response.data.BodyLength,
          		TitleLength: response.data.TitleLength,
              Weekday: response.data.Weekday,
              GMTHour: response.data.GMTHour,
          		SentimentScore: global_sentiment,
          		Ntag: response.data.Ntag.toString(),
          		AvgUpperCharsPPost: response.data.AvgUpperCharsPPost,
          		url: response.data.URL.toString()

          });
        })
        .catch( (error) => {
          console.log(error);
        });
    },1000)
  }


}

export default App;
