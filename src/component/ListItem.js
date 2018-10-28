// Theodore Sawyer, FEND - Project 07: 'Neighborhood Map (React)' / ListItem.js / 10.21.18

import React, { Component } from 'react';

export default class ListItem extends Component {
  render() {
    return (
      <li className='listItem' onClick={() => this.props.handleListItemClick(this.props)}>
          <img src={this.props.categories[0].icon.prefix + '32' + this.props.categories[0].icon.suffix} alt={this.props.categories[0].name}/>
        {this.props.name}
      </li>
    );
  }
}
