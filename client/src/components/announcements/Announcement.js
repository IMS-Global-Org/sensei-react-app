import React from 'react'
import { Grid, Card, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'
import { AnnouncementFormat } from '../helpers/DateFormats'
import LabelField from '../helpers/LabelField'

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
          <Card.Header style={{textAlign: 'center', padding: '1rem 0'}}>
            {data.title}
          </Card.Header>
          <Card.Meta>
            Event Type:&nbsp;{data.category}
            { data.link &&
              <span>
                <br />
                Web Site: <Icon link to={ data.link } name='external' />
              </span>
            }
          </Card.Meta>
          <Card.Description>
            <LabelField bold>Details</LabelField>&nbsp;{data.message}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Grid>
            <Row columns={1} data-top={true}>
              <Column width={16}>
                <LabelField bold width='4rem'>
                  Begins
                </LabelField>
                {moment(data.start_date).format(AnnouncementFormat)}
              </Column>
            </Row>
            <Row columns={1} data-bottom={true}>
              <Column width={16}>
                <LabelField bold width='4rem'>
                  Ends
                </LabelField>
                {moment(data.end_date).format(AnnouncementFormat)}
              </Column>
            </Row>
            <Row columns={2} data-top={true}>
              <Column width={8}>
                <LabelField bold>
                  Fee
                </LabelField>
                {data.cost ? `$${data.cost}` : 'None'}
              </Column>
              <Column width={8}>
                <LabelField bold>
                  Enroll
                </LabelField>{ data.registration ? 'Yes' : 'No' }
              </Column>
            </Row>
          </Grid>
        </Card.Content>
        { data.extra &&
          <Card.Content>
            <LabelField bold>
              Notice
            </LabelField>{ data.extra ? data.extra : '' }
          </Card.Content>
        }
      </Card>
    )
  } else {
    return null
  }
}

export default Announcement
