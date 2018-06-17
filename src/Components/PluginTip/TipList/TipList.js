import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import {getTips} from '../../../services';
import {getPost} from '../../../utils'
import './TipList.css';



class TipList extends Component
{

  constructor(props) {
    super(props);
    this.state = {
      'tip_list': []
    }
    };



  render() {
    return (
      <div className={'tip-list'}>
        {this.state.tip_list}
      </div>
    );
  }


  componentDidMount() {

    getTips(getPost()).then(data => {
      for (var i = 0; i < data.length; i++) {
        this.state.tip_list.push(
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{i} - {data[i].msg}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
      }
  })




  }


  componentWillUnmount(){
  }

}


export default TipList;
