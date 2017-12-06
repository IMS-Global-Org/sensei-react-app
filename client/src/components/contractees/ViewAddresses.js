import React, { Component } from 'react'
import { Grid, List, Icon, Popup } from 'semantic-ui-react'
import EditModal from './EditModal'

class ViewAddresses extends Component {
  state = { activeAddress: '' }

  showEditModal = (activeAddress) => {
    this.setState({
      activeAddress: this.props.addresses.find( a => {
         return a.id === activeAddress
      })
    })
  }
  resetActiveComp = () => this.setState({ activeAddress: '' })

  displayAddresses = () => {
    const { addresses, editor } = this.props
    if( addresses && addresses.length > 0 ) {
      return addresses.map( address => {
        return (
          <List.Item key={address.id}>
            <Grid divided>
              <Grid.Row columns={16}>
                <Grid.Column width={4}>
                  {address.type_of}
                </Grid.Column>
                <Grid.Column width={10}>
                  {address.street1}
                  <br />
                  {address.street2}
                  <br />
                  {`${address.city}, ${address.state}   ${address.zipcode}`}
                  <br />
                  {address.country || ''}
                </Grid.Column>
                { editor &&
                  <Grid.Column width={2}>
                    <Popup
                      trigger={
                        <Icon
                          name='edit'
                          onClick={()=>this.showEditModal(address.id)} />
                      }
                      content='Edit Address Info' />
                  </Grid.Column>
                }
              </Grid.Row>
            </Grid>
          </List.Item>
        )
      })
    }
  }

  render = () => {
    const { activeAddress } = this.state
    const { contracteeId } = this.props
    return (
      <List divided relaxed>
        { this.displayAddresses() }
        { activeAddress &&
          <EditModal
            component='address'
            data={activeAddress}
            contracteeId={contracteeId}
            resetActiveComp={this.resetActiveComp} />
        }
      </List>
    )
  }
}

export default ViewAddresses
