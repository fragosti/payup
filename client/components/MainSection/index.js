
import React, { Component } from 'react'
import Listing from '../Listing'
import Footer from '../Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filters'
import style from './style.css'

const LISTING_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: listing => !listing.completed,
  [SHOW_COMPLETED]: listing => listing.completed
}

class MainSection extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { filter: SHOW_ALL }
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.listings.some(listing => listing.completed)
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted()
    }
  }

  handleShow(filter) {
    this.setState({ filter })
  }

  renderToggleAll(liveCount) {
    const { listings, actions } = this.props
    if (listings.length > 0) {
      return <input
        className={style.toggleAll}
        type="checkbox"
        checked={liveCount === listings.length}
        onChange={actions.completeAll} />
    }
  }

  renderFooter(liveCount) {
    const { listings } = this.props
    const { filter } = this.state
    const activeCount = listings.length - liveCount

    if (listings.length) {
      return (
        <Footer liveCount={liveCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={::this.handleClearCompleted}
          onShow={::this.handleShow} />
      )
    }
  }

  render() {
    const { listings, actions } = this.props
    const { filter } = this.state

    const filteredListings = listings.filter(LISTING_FILTERS[filter])
    const liveCount = listings.reduce((count, listing) => {
      return listing.live ? count + 1 : count
    }, 0)

    return (
      <section className={style.main}>
        {this.renderToggleAll(liveCount)}
        <ul className={style.normal}>
          {filteredListings.map(listing =>
            <Listing key={listing.id} listing={listing} {...actions} />
          )}
        </ul>
        {this.renderFooter(liveCount)}
      </section>
    )
  }
}

export default MainSection
