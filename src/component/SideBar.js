// Theodore Sawyer, FEND - Project 07: 'Neighborhood Map (React)' / SideBar.js / 10.21.18

import React, { Component } from 'react';
import { stack as Menu } from 'react-burger-menu';
import '../SideBar.css';
import VenueList from './VenueList';

export default class SideBar extends Component {

    constructor() {
      super();

      this.state = {
        query:'',
        venues: []
      };
    }

  handleFilterVenues = () => {
    if(this.state.query.trim() !== '') {
      const venues = this.props.venues.filter(venue => venue.name
      .toLowerCase()
      .includes(this.state.query.toLowerCase())
    );
      return venues;
    }
    return this.props.venues;
  };

  handleChange = e => {
    this.setState({query:e.target.value});

    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);

      if(isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };

  render() {
    return (
      <Menu noOverlay>
        <div className='sideBar'>
          <h1 className='heading'>PIZZA! PIZZA!<br />DECATUR GA</h1>
          <input
            type={'search'}
            id={'search'}
            placeholder={'Venues Filter'}
            onChange={this.handleChange}
          />
          <VenueList
            {...this.props}
              venues={this.handleFilterVenues()}
              handleListItemClick={this.props.handleListItemClick}
          />
        </div>
      </Menu>
    );
  }
}
