import React from 'react';
import Card from './card.jsx';

var styles = {
  container: {
    marginBottom: '2em',
    padding: '1em'
  }
};

var readableBuildTime = function(ms) {
  var min = Math.floor(ms / 60000); 
  ms -= min * 60000;
  var sec = Math.floor(ms / 1000);
  if (min > 0) 
    return min + ' min ' + sec + ' sec';
  else
    return sec + ' sec'
}

export default class Build extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = this.createState(props);
  }
  

  
  createState(props) {
    var elapsed = new Date().getTime() - props.build.timestamp;
  
    var duration = props.build.building
      ? readableBuildTime(elapsed)
      : readableBuildTime(props.build.duration);
      
    return {
      state: 'default',
      building: props.build.building,
      started: props.build.timestamp,
      duration: props.build.duration,
      estimated: props.build.estimatedDuration,
      items: [
        { payload: 1, text: 'Started', value: new Date(props.build.timestamp).toString() },
        { payload: 2, text: 'Duration', value: duration },
        { payload: 3, text: 'Action', value: props.build.actions[0].causes[0].shortDescription },
        { payload: 4, text: 'Result', value: props.build.result },
      ]
    }
  }
    
  updateData(props) {
    this.setState(this.createState(props));
  }
  
  render() {  
    var elapsed = new Date().getTime() - this.state.started;
    var progress = Math.ceil(100 * elapsed / this.state.estimated);
    var barStyle = {
      width: progress + '%'
    }
    
    var buildStatus;
    if (this.state.building) {
      buildStatus = <div className="progress"><div className="determinate" style={barStyle}></div></div>;
    }
    else {
      buildStatus = <span className="card-title grey-text">{this.props.title}</span>;
    }
  
    return (
      <div className="card">
        <div className="card-content">
          {buildStatus}
          <ul className="collection">
          {this.state.items.map(function(item) {
            return <li className="collection-item">{item.text}<span className="right">{item.value}</span></li>;
          })}
          </ul>
        </div>
      </div>
    );
  }
}





