import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
// import EditAddress from './EditAddress'

class EditAddresses extends Component {
  state = { activeAddress: '' }

  displayAddresses = () => {
    const { addresses } = this.props
    if( addresses && addresses.length > 0 ) {
      return addresses.map( address => (
        <List.Item>

        </List.Item>
      ))
    }
  }

  render = () => {
    return (
      <List divided relaxed>
        { this.displayAddresses() }
      </List>
    )
  }
}

export default EditAddresses
