import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as listingActions from '../../actions/listings'
import ListingTable from '../ListingTable'
import TableHeading from '../TableHeading'
import SliderToggle from '../SliderToggle'
import Modal from '../Modal'
import EditAddListingModal from '../EditAddListingModal'
import ListingForm from '../ListingForm'
import classnames from 'classnames'
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
    this.state = { 
      filter: SHOW_ALL,
      editAddModalShowing: false,
      listingInModal: null,
    }
  }

  componentDidMount() {
    const { actions, auth } = this.props
    actions.refreshListings(auth.user.uid)
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

  openAddEditModal(listing) {
    this.setState({
      editAddModalShowing: true,
      listingInModal: listing || null
    })
  }

  closeAddEditModal() {
    this.setState({
      editAddModalShowing: false,
      listingInModal: null
    })
  }

  render() {
    const { listings, auth, actions, loadingState } = this.props

    const { filter, editAddModalShowing, listingInModal } = this.state
    // this.renderToggleAll(liveCount)
    const filteredListings = listings.filter(LISTING_FILTERS[filter])
    const liveCount = listings.reduce((count, listing) => {
      return listing.live ? count + 1 : count
    }, 0)

    let content = ( 
      <ListingTable
        isLoading={loadingState.pendingRequests.length}
        listings={filteredListings}
        fileToUrlMapping={auth.fileIdToURL}
        actions={actions}
        openEditListingModal={::this.openAddEditModal}
      /> 
    )

    if (!listings.length) {
      content = (
        <h3> You have no listings! </h3>
      )
    }

    return (
      <div className='ui raised padded container segment'>
        <EditAddListingModal
          showing={editAddModalShowing}
          close={::this.closeAddEditModal}
          user={auth.user}
          listing={listingInModal}
          actions={actions}
        />
        <div>
          <h1 className={classnames(style.heading, 'ui header')}> Listings </h1>
        </div>
        <div className='ui clearing divider'/>
        <TableHeading
          openAddModal={::this.openAddEditModal}
        />
        {content}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    listings: state.listings,
    auth: state.auth,
    loadingState: state.loadingState,
  }
}

function mapDispatchToProps(dispath) {
  return { 
    actions: bindActionCreators(listingActions, dispath)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection)
