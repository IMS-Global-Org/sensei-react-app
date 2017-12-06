import React, { Component } from 'react'
import { List, Popup, Icon } from 'semantic-ui-react'
import moment from 'moment'
import LabelField from './LabelField'
import { BirthdateFormat } from '../helpers/DateFormats'
import PopupArea from './PopupArea'
import EditModal from './EditModal'


class ViewPersonalInfo extends Component {
  state = { showEditModal: false }

  showEditModal = () => this.setState({ showEditModal: true })
  resetActiveComp = () => this.setState({ showEditModal: false })

  displayPersonalInfo = () => {
    const { contractee, editor } = this.props
    const bday = moment(contractee.birthdate).format(BirthdateFormat)
    return (
      <List.Item>
        <LabelField>Name</LabelField>
        {`${contractee.last}, ${contractee.first}`}
        <br />
        <LabelField>Birthdate</LabelField>
        {bday}
        { editor &&
          <PopupArea basic floated='right' textAlign='right'>
            <Popup
              trigger={
                <Icon
                  name='edit'
                  onClick={()=>this.showEditModal(contractee.id)} />
              }
              content='Edit Personal Info' />
          </PopupArea>
        }
      </List.Item>
    )
  }

  render = () => {
    const { showEditModal } = this.state
    const { contractee } = this.props
    return (
      <List divided relaxed>
        { this.displayPersonalInfo() }
        { showEditModal &&
          <EditModal
            component='personalInfo'
            data={contractee}
            contracteeId={contractee.id}
            resetActiveComp={this.resetActiveComp} />
        }
      </List>
    )
  }
}

export default ViewPersonalInfo
