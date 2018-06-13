import React, { Component } from 'react';
import Tip from './Tip/Tip.js'
import PluginTip from './PluginTip/PluginTip.js'
import ReactDOM from 'react-dom';


class App extends Component
{
  render(){return(<div></div>)}

  componentDidMount() {
        const body_id = 'wmd-input';
        const title_id = 'title';
        const tags_id = 'tag-editor';
        const content_id = 'header';

        const body = document.getElementById(body_id);
        const title = document.getElementById(title_id);
        const tags = document.getElementsByClassName(tags_id)[0].childNodes[1]
        const content = document.getElementsByTagName(content_id)[0]

        const plugin_tips = document.createElement('div');

        tags.id = 'tags'
        plugin_tips.id = 'plugin_tips';

        const tip = document.createElement('div');
        tip.id = 'tip';


        content.appendChild(tip);
        ReactDOM.render(<Tip/>, document.getElementById('tip'));

        var rendering_on

        body.onfocus = function()
        {
            if(rendering_on && rendering_on !== "body")
                ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));
            body.parentNode.insertBefore(plugin_tips, body.nextSibling);
            ReactDOM.render(<PluginTip attached_to={body_id} my_style={body_id}/>, document.getElementById('plugin_tips'));
            rendering_on = "body"
        }

        // body.onblur = function()
        // {
        //     ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));
        // }


        title.onfocus = function()
        {
            if(rendering_on && rendering_on !== "title")
                ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));
            title.parentNode.insertBefore(plugin_tips, title.nextSibling);
            if(document.getElementById('question-suggestions').childNodes.length === 1)
            ReactDOM.render(<PluginTip attached_to={title_id} my_style={title_id} /> , document.getElementById('plugin_tips'));
            else
            ReactDOM.render(<PluginTip attached_to={title_id} my_style="title_suggestion" /> , document.getElementById('plugin_tips'));
            rendering_on = "title"

        }

        // title.onblur = function()
        // {
        //     ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));
        // }



        tags.onfocus = function()
        {
            if(rendering_on && rendering_on !== "tags")
                ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));

            ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));
            tags.parentNode.insertBefore(plugin_tips, tags.nextSibling);
            ReactDOM.render(<PluginTip attached_to={tags_id} my_style={tags_id} /> , document.getElementById('plugin_tips'));
            rendering_on = "tags"

        }

        // tags.onblur = function()
        // {
        //     ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));
        // }

  }

};

export default App;
