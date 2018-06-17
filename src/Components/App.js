import React, { Component } from 'react';
import Tip from './Tip/Tip.js'
import PluginTip from './PluginTip/PluginTip.js'
import ReactDOM from 'react-dom';

import store from '../store';

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

        const plugin_tip_title = document.createElement('div');
        const plugin_tip_body = document.createElement('div');
        const plugin_tip_tag = document.createElement('div');

        tags.id = 'tags'
        plugin_tip_title.id = 'plugin_tip_title';
        plugin_tip_body.id = 'plugin_tip_body';
        plugin_tip_tag.id = 'plugin_tip_tag';

        const tip = document.createElement('div');
        tip.id = 'tip';


        content.appendChild(tip);
        ReactDOM.render(<Tip/>, document.getElementById('tip'));


        title.parentNode.insertBefore(plugin_tip_title, title.nextSibling);
        if(document.getElementById('question-suggestions').childNodes.length === 1)
          ReactDOM.render(<PluginTip attached_to={title_id} my_style={title_id} category={'title'}/> , document.getElementById('plugin_tip_title'));
        else
          ReactDOM.render(<PluginTip attached_to={title_id} my_style="title_suggestion" category={'title'}/> , document.getElementById('plugin_tips'));


        body.parentNode.insertBefore(plugin_tip_body, body.nextSibling);
        ReactDOM.render(<PluginTip attached_to={body_id} my_style={body_id}category={'body'}/>, document.getElementById('plugin_tip_body'));

        tags.parentNode.insertBefore(plugin_tip_tag, tags.nextSibling);
        ReactDOM.render(<PluginTip attached_to={tags_id} my_style={tags_id} category={'tag'}/> , document.getElementById('plugin_tip_tag'));


        title.onfocus = function()
        {
          if(!store.subject.modified.includes("title"))
            store.get('modified').push("title");
        }

        body.onfocus = function()
        {
          if(!store.subject.modified.includes("body"))
            store.get('modified').push("body");
        }

        tags.onfocus = function()
        {
          if(!store.subject.modified.includes("tag"))
            store.get('modified').push("tag");
        }

        //
        // var rendering_on
        //
        // body.onfocus = function()
        // {
        //     if(rendering_on && rendering_on !== "body")
        //         ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));
        //     body.parentNode.insertBefore(plugin_tips, body.nextSibling);
        //     ReactDOM.render(<PluginTip attached_to={body_id} my_style={body_id}/>, document.getElementById('plugin_tips'));
        //     rendering_on = "body"
        // }
        //
        //
        //
        // title.onfocus = function()
        // {
        //     if(rendering_on && rendering_on !== "title")
        //         ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));
        //     title.parentNode.insertBefore(plugin_tips, title.nextSibling);
        //     if(document.getElementById('question-suggestions').childNodes.length === 1)
        //     ReactDOM.render(<PluginTip attached_to={title_id} my_style={title_id} /> , document.getElementById('plugin_tips'));
        //     else
        //     ReactDOM.render(<PluginTip attached_to={title_id} my_style="title_suggestion" /> , document.getElementById('plugin_tips'));
        //     rendering_on = "title"
        //
        // }
        //
        //
        //
        //
        // tags.onfocus = function()
        // {
        //     if(rendering_on && rendering_on !== "tags")
        //         ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));
        //
        //     ReactDOM.unmountComponentAtNode(document.getElementById('plugin_tips'));
        //     tags.parentNode.insertBefore(plugin_tips, tags.nextSibling);
        //     ReactDOM.render(<PluginTip attached_to={tags_id} my_style={tags_id} /> , document.getElementById('plugin_tips'));
        //     rendering_on = "tags"
        //
        // }

  }

};

export default App;
