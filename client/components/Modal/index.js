import React, { Component } from 'react'
import classnames from 'classnames'

class Modal extends Component {

  syncState() {
    const $modal = $(this.modal)
    $modal.modal('setting', 'closable', !!this.props.closable)
    if (this.props.showing) {
      $modal.modal('show')
    } else {
      $modal.modal('hide')
    }
  }

  componentDidMount() {
    this.syncState()
  }

  componentDidUpdate(prevProps, prevState) {
    this.syncState()
  }

  render() {
    const { classes } = this.props 
    return (
      <div ref={(c) => this.modal = c}
        className={classnames('ui modal', classes)}>
        {this.props.children}
      </div>
    )
  }
}

export default Modal