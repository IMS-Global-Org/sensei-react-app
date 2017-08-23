import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Segment, Header, Icon, Message } from 'semantic-ui-react'
import styled from 'styled-components'

// Custom Styled Components
const Dragons = styled.div`
  background-image: url('BorderDragons.png');
  background-repeat: repeat-y !important;
  background-position: 1% 0%;
  background-size: auto 25% !important;
  height: 100vh;
`
const Videos = styled(Segment)`
  width: 50% !important;
  margin: 0 25% !important;
`

/**
 * Display the available programs and optional enrollment
 * @author Brennick Langston
 * @version 0.0.1
 */
class Programs extends Component {

  render() {
    return (
      <Dragons>
        <Container>
          <Videos>
            <Header as='h2' icon textAlign='center'>
              <Icon name='video play outline' size='massive' />
              <Header.Content>
                Program Videos
              </Header.Content>
              <Header.Subheader>
                Individual Program Videos for Students and Instructors
              </Header.Subheader>
            </Header>
            <p>
              Videos are provided by Bobby Lawrence Karate. Videos corresponding
              to individual student curriculum are available. To access the videos,
              a password is required. Password access is acquired through your
              current instructor. Please see your current instructor for obtaining
              a password and visual rights to the your corresponding curriculum
              videos.
            </p>
            <Message>
              <Message.Header>
                Access Bobby Lawrence Karate Curriculum Videos
              </Message.Header>
              <Message.List>
                <Message.Item>
                  Contact your instructor to setup your student account access.
                </Message.Item>
                <Message.Item>
                  Create a password that you'll remember easily.
                </Message.Item>
                <Message.Item>
                  Visit <a href='http://www.blkdojos.com/students-2/curriculum-assistance/' target='_blank'>BLK curriculum videos</a>.
                </Message.Item>
              </Message.List>
            </Message>
          </Videos>
        </Container>
      </Dragons>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    programs: state.programs,
  }
}

export default connect(mapStateToProps)(Programs)
