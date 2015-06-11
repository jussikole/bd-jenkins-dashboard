import React from 'react';
import Card from './card.jsx';
import Project from './project.jsx';

var styles = {
  grid: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    flex: 1,
    width: '25%',
    borderBottom: 0
  }
}


export default class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dashboard: {
        jobs: []
      }
    }
  }
  
  
  componentWillMount() {
    DashboardFeed.listen(function(dashboard) {
      console.log(dashboard);
      this.setState({ dashboard: dashboard });
    }.bind(this));
  }
  
  render() {
    var columns = [];
    
  
    return (
      <div style={styles.grid}>
        {this.state.dashboard.jobs.map(function(job) {
          return <Project details={job} style={styles.column} />
        })}
      </div>
    );
  } 
}