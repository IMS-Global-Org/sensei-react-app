import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'

import {
  queryClientList,
  indexClientList,
} from '../../actions/access'

class ClientSearchForm extends Component {
  defaults = { name: '', email: '' }
  state = { ...this.defaults }

  isValidQuery() {
    const { name, email } = this.state
    return ( !this.isEmptyQuery(name) || !this.isEmptyQuery(email) ) ? true : false
  }

  isEmptyQuery( queryString ) {
    return ( queryString && (queryString.length % 3) === 0 ) ? false : true
  }

  hasEmptyQueryParams() {
    const { name, email } = this.state
    return ( !name && !email ) ? true : false
  }

  onInputChange = ({target: {id,value}}) => {
    const { dispatch } = this.props
    this.setState({ [id]: value ? value : '' },()=>{
      if( this.isValidQuery() ) {
        dispatch(queryClientList(this.state))
      } else if( this.hasEmptyQueryParams() ){
        dispatch(indexClientList())
      }
    })
  }

  render = () => {
    const { name, email } = this.state
    return (
      <Form>
        <Form.Group widths={2}>
          <Form.Input
            label='Client Name'
            id='name'
            value={name}
            onChange={this.onInputChange} />
          <Form.Input
            label='Client E-mail'
            id='email'
            value={email}
            onChange={this.onInputChange} />
        </Form.Group>
      </Form>
    )
  }
}

export default connect()(ClientSearchForm)
