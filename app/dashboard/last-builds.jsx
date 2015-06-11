import React from 'react';

var styles = {
  wrapper: {

  },
  graph: {
    height: 100,
    width: '100%',
  }
}

export default class LastBuilds extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      builds: []
    }
  }
  
  render() {
    var first = this.props.builds[0].timestamp;
    var last = this.props.builds[this.props.builds.length-1].timestamp;
    var builds = this.props.builds;
    return (
      <div style={styles.wrapper}>
        <div style={styles.graph}>
          {builds.slice(1).map(function(build, i) {
            var style = {
              float: 'left',
              height: 100,
              width: 100 * (build.timestamp - builds[i].timestamp) / (last - first) + '%' 
            };
            var className = build.result === 'SUCCESS' ? 'green' : 'red'
            return <div style={style} className={className}></div>
          })}
        </div>
      </div>
    );
  } 
}