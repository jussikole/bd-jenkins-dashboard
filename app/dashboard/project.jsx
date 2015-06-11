import React from 'react';
import Build from './build.jsx';
import LastBuilds from './last-builds.jsx';

var styles = {
  header: {
    padding: '0.3em'
  },
  bar: {
    boxShadow: 'none'
  },
  content: {
    padding: '1em'
  },
  menu: {
    boxShadow: 0
  }
};

export default class Project extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      details: props.details,
      items: {}
    }
  }
  
  updateDetails(details) {
    this.setState({
      details: details,
    });
    
    this.refs.lastBuild.updateBuild(details.lastBuild);
  }
  
  render() {

  
    return (
      <div style={this.props.style}>
        <div style={styles.header} className="center-align white-text">
          <h3>{this.state.details.displayName}</h3>
        </div>
        <div style={styles.wrapper}>
          <div style={styles.content}>
            <Build build={this.state.details.lastBuild} ref="lastBuild" title="Last build" />
            <Build build={this.state.details.lastSuccessfulBuild} ref="lastSuccessfulBuild" title="Last successful build" />
            <LastBuilds builds={this.state.details.builds} />
          </div>
        </div>
      </div>
    );
  }
}





