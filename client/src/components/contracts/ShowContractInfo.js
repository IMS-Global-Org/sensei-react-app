import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Dimmer, Loader, Label, Grid, List } from 'semantic-ui-react'
import moment from 'moment'
import styled from 'styled-components'

// Actions
import {
  resetContract,
  showContract,
} from '../../actions/contracts'

// Custom Styled Components
const Header = styled.span`
  font-weight: bold;
  ::after {
    content: ':';
  }
`
const Text = styled.span`
  padding: 0 1rem;
`

class ShowContractInfo extends Component {
  defaults = {
    start_date: '',
    end_date: '',
    amount: '',
    interval: '',
    status: '',
    holders: '',
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadState(this.props)
  componentWillReceiveProps = ( props ) => this.loadState(props)
  componentWillUnmount = () => resetContract()

  loadState = ( props ) => {
    const { dispatch, contractId } = props
    const { id } = this.state
    if( contractId !== id ){
      dispatch(showContract(contractId))
    }
    this.setState({ ...this.props.contract })
  }

  render = () => {
    const {
      start_date, end_date, amount,
      interval, status, holders
    } = this.state

    return (
      <Segment raised>
        <Label ribbon>Overview</Label>
        <Text>Contract Information</Text>
        <Segment basic>
          <Dimmer
            inverted
            active={ !start_date ? true : false }>
            <Loader
              inverted
              active={ !start_date ? true : false } />
          </Dimmer>
          <Grid celled>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header>Start Date</Header>
                <Text>{moment(start_date).format('ddd, MMM Do YYYY')}</Text>
              </Grid.Column>
              <Grid.Column>
                <Header>End Date</Header>
                <Text>{moment(end_date).format('ddd, MMM Do YYYY')}</Text>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header>Status</Header>
                <Text>{ status === 1 ? 'Active' : 'Inactive' }</Text>
              </Grid.Column>
              <Grid.Column>
                <Header>Interval</Header>
                <Text>{ interval === 6 ? '6 Mo.' : '12 Mo.'}</Text>
              </Grid.Column>
              <Grid.Column>
                <Header>Amount</Header>
                <Text>${amount}</Text>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Header>Contractees</Header>
                <List ordered>
                  { holders && holders.map( holder => (
                    <List.Item key={holder.id}>
                      {holder.last},&nbsp;{holder.first}
                    </List.Item>
                  ))}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contract: state.contracts.contract.data,
  }
}

export default connect(mapStateToProps)(ShowContractInfo)
