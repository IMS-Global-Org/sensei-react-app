import React from 'react'
import { Popup, Icon, List } from 'semantic-ui-react'

const ContracteesPopup = ({ contractees }) => {

  return (
    <Popup
      trigger={<Icon name='user circle' />}>
        <Popup.Header>Contractees</Popup.Header>
        <Popup.Content>
          <List ordered>
            { contractees.map( (contractee, index) => (
              <List.Item key={contractee.last + index}>
                {contractee.last},&nbsp;{contractee.first}
              </List.Item>
            ))}
          </List>
        </Popup.Content>
      </Popup>
  )
}

export default ContracteesPopup
