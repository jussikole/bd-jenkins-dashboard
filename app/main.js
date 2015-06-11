import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dashboard from './dashboard/dashboard.jsx';
injectTapEventPlugin();

window.DashboardFeed = {
  listeners: [],
  listen(callback) {
    this.listeners.push(callback);
  }
};

var socket = io();
socket.on('dashboard', function(dashboard) {
  DashboardFeed.listeners.forEach(function(callback) {
    callback(dashboard);
  });
});

React.render(React.createElement(Dashboard, null), document.getElementById('content'));