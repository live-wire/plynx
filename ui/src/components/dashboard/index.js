import React, { Component } from 'react';
import Graphs from './Graphs';
import MasterState from './MasterState';

import './style.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    document.title = "Dashboard - PLynx";
  }

  render() {
    return (
      <div className='dashboard'>
        <div className='dashboard-item'>
          <MasterState />
        </div>
        <div className='dashboard-item'>
          <Graphs />
        </div>
      </div>
    );
  }
}
