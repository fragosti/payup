import React, { Component } from 'react'
import ListingItem from '../ListingItem'
import {fieldEditableMappings} from '../../constants/mappings'
import classnames from 'classnames'
import style from './style.css'


class Listing extends Component {
  constructor(props, context) {
    super(props, context)
  }

  handleSave(field, value) {
    const listing = this.props.listing
    this.props.editListing(listing, field, value)
  }

  render() {
    const { listing, visibleFields, deleteListing, openEditListingModal } = this.props 
    const { id } = listing
    return (
      <tr>
        <td className='collapsing'>
            <a onClick={() => openEditListingModal(listing)}> 
              <i className='large setting icon'/>
            </a>
            <a onClick={() => deleteListing(id)}>
              <i className='large red remove icon'/>
            </a>
        </td>
        {visibleFields.map(fieldName => 
          <ListingItem 
            editable={fieldEditableMappings[fieldName]}
            key={fieldName}
            name={fieldName}
            value={listing[fieldName]}
            handleEdit={this.handleSave.bind(this, fieldName)}
          />
        )}
      </tr>
    )
  }
}

export default Listing