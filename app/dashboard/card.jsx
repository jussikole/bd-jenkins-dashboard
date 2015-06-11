import React from 'react';

var styles = {
  default: {
    bar: {

    }
  },
  success: {
    bar: {

    }
  },
  failure: {
    bar: {

    }
  },
  cardContent: {

  }
}

export default class Card extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme || 'default',
      loading: false
    }
  }
  
  render() {
    var content = <div>{ this.props.children }</div>
    
    return (
      <div style={styles.cardContent}>
        {content}
      </div>
    );
  } 
}