import React, { Component } from 'react';
import './button-loading.scss';

export default class ButtonLoading extends Component {
  render() {
    return (
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
