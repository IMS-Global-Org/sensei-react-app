import React from 'react'
import { List, Popup, Icon } from 'semantic-ui-react'
import LabelField from './LabelField'
import PopupArea from './PopupArea'

const ViewEmails = ({ emails }) => {
  let components
  if( emails && emails.length > 0 ) {
    components = emails.map( email => {
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
          </PopupArea>
        </List.Item>
      )
    })
  }

  return (
    <List divided relaxed>
      { components }
    </List>
  )
}

export default ViewEmails
