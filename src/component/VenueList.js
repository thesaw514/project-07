// Theodore Sawyer, FEND - Project 07: 'Neighborhood Map (React)' / VenueList.js / 10.21.18

import React, { Component } from 'react';
import ListItem from './ListItem';

export default class VenueList extends Component {
  render() {
    return (
      <ol className='venueList'>
        {this.props.venues &&
          this.props.venues.map((venue,idx) => (
            <ListItem
              key={idx}
                {...venue} handleListItemClick={this.props.handleListItemClick}
              />
            ))}
      </ol>
    );
  }
}
