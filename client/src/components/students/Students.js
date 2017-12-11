import React from 'react'
import { Redirect } from 'react-router'
import { Container, Segment } from 'semantic-ui-react'
import ResultsTable from './ResultsTable'
import User from '../User'

const Students = () => {
  if( !(new User()).isAdmin() ) {
    return ( <Redirect to='/' /> )
  } else {
    return (
      <Container>
        <Segment>
          <ResultsTable />
        </Segment>
      </Container>
    )
  }
}

export default Students
