import React, { Component } from 'react'
import { List, Popup, Icon } from 'semantic-ui-react'
import LabelField from '../helpers/LabelField'
import PopupArea from './PopupArea'
import EditModal from './EditModal'


class ViewEmails extends Component {
  state = { activeEmail: '' }

  resetActiveComp = () => this.setState({ activeEmail: '' })
  showEditModal = ( activeEmail ) => {
    this.setState({
      activeEmail: this.props.emails.find( email => {
        return email.id === activeEmail
      })
    })
  }

  displayEmails = () => {
    const { emails, editor } = this.props
    if( emails && emails.length > 0 ) {
      return emails.map( email => {
        return (
          <List.Item key={email.id}>
            <LabelField>{email.type_of}</LabelField>
            {email.address}
            <PopupArea basic floated='right' textAlign='right'>
              <Popup
                trigger={<Icon name={email.active ? 'microphone' : 'microphone slash'} />}
                disabled={emails.active}
                content={emails.active ? 'In Service!' : 'Out of Service!'} />
              <Popup
                trigger={<Icon name='id badge' />}
                content={email.owner_of} />
              { editor &&
                <Popup
                  trigger={
                    <Icon
                      name='edit'
                      onClick={()=>this.showEditModal(email.id)} />
                  }
                  content='Edit Email Info' />
              }
            </PopupArea>
          </List.Item>
        )
      })
    }
  }

  render = () => {
    const { activeEmail } = this.state
    const { contracteeId } = this.props
    return (
      <List divided relaxed>
        { this.displayEmails() }
        { activeEmail &&
          <EditModal
            component='email'
            data={activeEmail}
            contracteeId={contracteeId}
            resetActiveComp={this.resetActiveComp} />
        }
      </List>
    )
  }
}

export default ViewEmails
