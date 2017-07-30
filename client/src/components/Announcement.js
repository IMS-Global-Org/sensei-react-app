import React from 'react'
import { Grid, Card } from 'semantic-ui-react'
import styled from 'styled-components'

// Custom Styled Components
const Row = styled(Grid.Row)`
  padding: 0 0 !important;
  ${ props => props.top ? 'padding-top: 1% !important' : '' }
  ${ props => props.bottom ? 'padding-bottom: 1% !important' : '' }
`
const Column = styled(Grid.Column)`
  padding: 0 3% !important;
`

/**
 * Presentation of a single Announcement
 */
const Announcement = ({ data }) => {
  if( data ) {
    return (
      <Card>
        <Card.Content extra >
          <Card.Header>{data.title}</Card.Header>
          <Card.Meta>Event Type:&nbsp;{data.category}</Card.Meta>
          <Card.Description>
            Desc:&nbsp;{data.message}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Grid>
            <Row columns={2} top>
              <Column width={8}>
                Begins:&nbsp;{data.start_date}
              </Column>
              <Column width={8}>
                Fee:&nbsp;{data.cost && `$${data.cost}`}
              </Column>
            </Row>
            <Row columns={2} bottom>
              <Column width={8}>
                Ends:&nbsp;{data.end_date}
              </Column>
              <Column width={8}>
                Registration: { data.registration ? 'Yes' : 'No' }
              </Column>
            </Row>
          </Grid>
        </Card.Content>
      </Card>
    )
  } else {
    return null
  }
}

export default Announcement
