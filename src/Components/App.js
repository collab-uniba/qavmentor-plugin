import React, { Component } from 'react';
import Tip from './Tip/Tip.js'
import PluginButton from './PluginButton/PluginButton.js'
import ReactDOM from 'react-dom';


class App extends Component
{
  render(){return(<div></div>)}

  componentDidMount() {
        const question_body = document.getElementById('wmd-input');
        const title = document.getElementById('title');
        const tags = document.getElementsByClassName("tag-editor")[0].childNodes[1]
        const plugin_button = document.createElement('div');
        const content = document.getElementsByTagName('header')[0]

        tags.id = 'tags'
        plugin_button.id = 'plugin_button';

        const tip = document.createElement('div');
        tip.id = 'tip';


        content.appendChild(tip);
        ReactDOM.render(<Tip/>, document.getElementById('tip'));


        question_body.onfocus = function()
        {
            question_body.parentNode.insertBefore(plugin_button, question_body.nextSibling);
            ReactDOM.render(<PluginButton attached_to="wmd-input" my_style="body"/>, document.getElementById('plugin_button'));
        }

        question_body.onblur = function()
        {
            // console.log("unmounting body")
            ReactDOM.unmountComponentAtNode(document.getElementById('plugin_button'));
        }


        title.onfocus = function()
        {
            title.parentNode.insertBefore(plugin_button, title.nextSibling);
            if(document.getElementById('question-suggestions').childNodes.length === 1)
            ReactDOM.render(<PluginButton attached_to="title" my_style="title" /> , document.getElementById('plugin_button'));
            else
            ReactDOM.render(<PluginButton attached_to="title" my_style="title_suggestion" /> , document.getElementById('plugin_button'));

        }

        title.onblur = function()
        {
            // console.log("unmounting title")
            ReactDOM.unmountComponentAtNode(document.getElementById('plugin_button'));
        }



        tags.onfocus = function()
        {
            // make_request()
            tags.parentNode.insertBefore(plugin_button, tags.nextSibling);
            if(document.getElementById('question-suggestions').childNodes.length === 1)
            ReactDOM.render(<PluginButton attached_to="tags" my_style="tags" /> , document.getElementById('plugin_button'));
            else
            ReactDOM.render(<PluginButton attached_to="tags" my_style="tags" /> , document.getElementById('plugin_button'));

        }

        tags.onblur = function()
        {
            // console.log("unmounting tags")
            ReactDOM.unmountComponentAtNode(document.getElementById('plugin_button'));
        }

  }

};

export default App;
