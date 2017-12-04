import React from 'react'
import { List, Popup, Icon } from 'semantic-ui-react'
import LabelField from './LabelField'
import PopupArea from './PopupArea'


const ViewPhones = ({ phones }) => {
  let components
  if( phones && phones.length > 0 ) {
    components = phones.map( phone => {
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

export default ViewPhones
