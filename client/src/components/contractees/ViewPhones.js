import React, { Component } from 'react'
import { List, Popup, Icon } from 'semantic-ui-react'
import LabelField from './LabelField'
import PopupArea from './PopupArea'
import EditModal from './EditModal'


class ViewPhones extends Component {
  state = { activePhone: '' }

  showEditModal = ( activePhone ) => {
    const { phones } = this.props
    this.setState({
      activePhone: phones.find( p =>
        parseInt(p.id,10) === parseInt(activePhone,10) )
    })
  }

  resetActiveComp = () => this.setState({ activePhone: '' })

  displayPhones = () => {
    const { phones, editor } = this.props
    if( phones && phones.length > 0 ) {
      return phones.map( phone => {
        return (
          <List.Item key={phone.id}>
            <LabelField>
              {phone.type_of}
            </LabelField>
            {phone.phone_number}
            <PopupArea basic floated='right' textAlign='right'>
              <Popup
                trigger={<Icon name={phone.active ? 'microphone' : 'microphone slash'} />}
                content={phone.active ? 'In Service!' : 'Out of Service!'} />
              <Popup
                trigger={<Icon name='id badge' />}
                content={phone.owner_of} />
              <Popup
                trigger={<Icon name='text telephone' />}
                content={phone.texting ? 'Texting!' : 'NO TEXTING!'} />
              { editor &&
                <Popup
                  trigger={
                    <Icon
                      name='edit'
                      onClick={()=>this.showEditModal(phone.id)} />
                  }
                  content='Edit Telephone Number' />
              }
            </PopupArea>
          </List.Item>
        )
      })
    }
  }

  render = () => {
    const { activePhone } = this.state
    const { contracteeId } = this.props
    return (
      <List divided relaxed>
        { this.displayPhones() }
        { activePhone &&
          <EditModal
            component='phone'
            data={activePhone}
            contracteeId={contracteeId}
            resetActiveComp={this.resetActiveComp} />
        }
      </List>
    )
  }
}

export default ViewPhones
