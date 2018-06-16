import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

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
    var tip_list = []
    var n = Math.floor(Math.random() * 20);
    for (var i = 0; i < n; i++) {
      tip_list.push( <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>{i}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                          sit amet blandit leo lobortis eget.
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>)
    }

    this.setState({
      tip_list: tip_list
    })
  }


  componentWillUnmount(){
  }

}


export default TipList;
