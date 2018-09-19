import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { WbIncandescent, Done } from '@material-ui/icons';

import {getTips} from '../../../../services';
import {getPost} from '../../../../utils'

import './TipList.css';



class TipList extends Component
{

  constructor(props) {
      super(props);
      this.state = {
        tip_list: []
      }
  };

  render() {
    return (

      <React.Fragment>
        <div className={'tip-list'}>
          <List component="nav">
          {this.state.tip_list.map(function(d){
            if(!d.found){
              return (
                <React.Fragment>
                     <ListItem button disabled className={'tooltip'}>
                        <Done/>
                        <ListItemText primary={d.title} />
                     </ListItem>
                     <Divider/>
                </React.Fragment>
              );
            }else{
                return (
                  <React.Fragment>
                       <ListItem button className={'tooltip'}>
                          <WbIncandescent style={{transform: 'rotate(180deg)'}}/>
                          <ListItemText primary={d.title} />
                       </ListItem>
                       <Divider/>
                  </React.Fragment>);
           }
           })}
         </List>
        </div>
      </React.Fragment>
    );
  }


  componentWillMount() {
    getTips(getPost()).then(data => {
      var new_list = [];
      var already_found = false;
      for (var i = 0; i < data.length; i++) {
        already_found = false;
        for (var j = 0; j < new_list.length; j++) {
          if(new_list[j].index===data[i].index)
            already_found = true
        }
        if(!already_found && data[i].found === true)
        {
          new_list.push(data[i]);
        }
      }

      for (var k = 0; k < data.length; k++) {
        already_found = false;
        for (var l = 0; l < new_list.length; l++) {
          if(new_list[l].index===data[k].index)
            already_found = true
        }
        if(!already_found && data[k].found === false)
        {
          new_list.push(data[k]);
        }
      }
      this.setState({
        tip_list:new_list
      })
    })
  }
}


export default TipList;
