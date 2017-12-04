import React from 'react'
import { Grid, List } from 'semantic-ui-react'


const ViewAddresses = ({ addresses }) => {
  let components
  if( addresses && addresses.length > 0 ) {
    components = addresses.map( address => {
      return (
        <List.Item key={address.id}>
          <Grid divided>
            <Grid.Row columns={16}>
              <Grid.Column width={4}>
                {address.type_of}
              </Grid.Column>
              <Grid.Column width={12}>
                {address.street1}
                <br />
                {address.street2}
                <br />
                {`${address.city}, ${address.state}   ${address.zipcode}`}
                <br />
                {address.country || ''}
              </Grid.Column>
            </Grid.Row>
          </Grid>
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

export default ViewAddresses
