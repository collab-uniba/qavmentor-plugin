import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';

import { WbIncandescent, Done } from '@material-ui/icons';



import {getTips} from '../../../../services';
import {getPost} from '../../../../utils'
import './TipList.css';



class TipList extends Component
{

  constructor(props) {
      super(props);
      this.state = {
        tip_list: [],
        checkedA: true
      }
  };


  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    var checked = this.state.checkedA;
    return (

      <React.Fragment>
        <div className={'tip-list'}>
          <List component="nav">
          {this.state.tip_list.map(function(d){
            if(!d.found){
              //                      <span class="tooltiptext">Actionable</span>
              return (
                <React.Fragment>
                     <ListItem button disabled className={'tooltip'}>
                        {checked===true ? <WbIncandescent style={{transform: 'rotate(180deg)'}}/> : <Done/>}
                        <ListItemText primary={d.title} />
                     </ListItem>
                     <Divider/>
                </React.Fragment>
              );
            }else{
              //                        <span class="tooltiptext">Actionable</span>

                return (
                  <React.Fragment>
                       <ListItem button className={'tooltip'}>
                          <WbIncandescent style={{transform: 'rotate(180deg)'}}/>
                          <ListItemText primary={d.title} />
                       </ListItem>
                       <Divider/>
                  </React.Fragment>
                );
           }
           })}
         </List>
        </div>
        <Switch
          checked={this.state.checkedA}
          onChange={this.handleChange('checkedA')}
          value="checkedA"
        />
      </React.Fragment>
    );
  }


  componentWillMount() {
    getTips(getPost()).then(data => {
      var new_list = [];
      for (var i = 0; i < data.length; i++) {
        if(data[i].found === true)
        {
          new_list.push(data[i]);
        }
      }
      for (var j = 0; j < data.length; j++) {
        if(data[j].found === false)
        {
          new_list.push(data[j]);
        }
      }
      this.setState({
        tip_list:new_list
      })
    })
  }


  componentWillUnmount(){
  }

}


export default TipList;
