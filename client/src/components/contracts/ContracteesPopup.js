import React from 'react'
import { Popup, Icon, List } from 'semantic-ui-react'

const ContracteesPopup = ({ contractees }) => {

  const renderContractees = () => {
    if( contractees && contractees.length > 0 ) {
      return contractees.map( (contractee, index) => (
        <List.Item key={contractee.last + index}>
          {contractee.last},&nbsp;{contractee.first}
        </List.Item>
      ))
    } else {
      return (
        <List.Item key={'lastname0'}>
          No Contractees
        </List.Item>
      )
    }
  }

  return (
    <Popup
      trigger={<Icon name='user circle' />}>
        <Popup.Header>Contractees</Popup.Header>
        <Popup.Content>
          <List ordered>
            { renderContractees() }
          </List>
        </Popup.Content>
      </Popup>
  )
}

export default ContracteesPopup
