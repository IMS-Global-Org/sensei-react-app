import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'

// Actions
import {
  updateClientList,
} from '../../actions/access'

class ClientAccessForm extends Component {
  defaults = {
    permission: ''
  }
  state = { ...this.defaults }
  permissionLevels = ['guest', 'user', 'student', 'admin']

  componentDidMount = () => this.loadClient( this.props )
  componentWillReceiveProps = ( props ) => this.loadClient( props )
  loadClient = ( props ) => {
    const { client } = props
    const perms = client.permissions.split(',')
    this.setState({
      permission: perms[perms.length - 1]
    })
  }

  onRadioChange = (e,{id,checked}) => {
    if( checked ) {
      const { dispatch } = this.props
      const levelIndex = this.permissionLevels.findIndex( level => level === id )
      let permissions = this.permissionLevels.slice(0,levelIndex+1).join(',')
      const clientId = this.props.client.id
      dispatch(
        updateClientList(clientId,permissions,()=>{
          this.setState({ permission: id })
        })
      )
    }
  }

  render = () => {
    const { permission } = this.state
    return (
      <Form>
        <Form.Group inline>
          <Form.Radio
            label='Guest'
            id='guest'
            checked={permission === 'guest'}
            onChange={this.onRadioChange} />
          <Form.Radio
            label='User'
            id='user'
            checked={permission === 'user'}
            onChange={this.onRadioChange} />
          <Form.Radio
            label='Student'
            id='student'
            checked={permission === 'student'}
            onChange={this.onRadioChange} />
          <Form.Radio
            label='Admin'
            id='admin'
            checked={permission === 'admin'}
            onChange={this.onRadioChange} />
        </Form.Group>
      </Form>
    )
  }
}

export default connect()(ClientAccessForm)
