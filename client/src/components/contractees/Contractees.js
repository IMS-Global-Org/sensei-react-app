import React from 'react'
import { Redirect } from 'react-router'
import { Container } from 'semantic-ui-react'
import ContracteesTable from './ContracteesTable'
import User from '../User'

const Contractees = ({ user = new User() }) => (
    <Container>
      { user.isAdmin() ?
        <ContracteesTable />
      :
        <Redirect to='/' />
      }
    </Container>
)

export default Contractees
