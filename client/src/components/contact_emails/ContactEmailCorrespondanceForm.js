import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Checkbox } from 'semantic-ui-react'

// Actions
import {
  updateContactEmail,
} from '../../actions/contact_emails'


class ContactEmailCorrespondanceForm extends Component {
  defaults = {
    id: '',
    correspondance: '',
  }
  state = { ...this.defaults }

  componentDidMount = () => { this.loadCorrespondance(this.props) }
  componentWillReceiveProps = ( props ) => { this.loadCorrespondance(props) }
  loadCorrespondance = ( props ) => {
    const { email } = props
    if( email ) {
      this.setState({
        id: email.id,
        correspondance: email.correspondance,
      })
    }
  }

  toggleCorrespondance = (e,{id,checked}) => {
    const { dispatch } = this.props
    dispatch(updateContactEmail(id,{ correspondance: checked ? 1 : 0 }))
  }

  render = () => {
    const { id, correspondance } = this.state

    return (
      <Segment basic textAlign='right'>
        <Form>
          <Checkbox
            id={id}
            toggle
            size='mini'
            label='Correspondance Sent'
            checked={ correspondance ? true : false }
            onChange={this.toggleCorrespondance} />
        </Form>
      </Segment>
    )
  }
}

export default connect()(ContactEmailCorrespondanceForm)
