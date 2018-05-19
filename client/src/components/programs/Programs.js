import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container, Segment, Grid, Header, Message, Image,
} from 'semantic-ui-react'
import styled from 'styled-components'

// Images
import BlackBeltTraining from '../../images/black_belt_training.png'
import TeenAdult from '../../images/teen_adult.png'
import Juniors from '../../images/juniors.png'
import BasicProgram from '../../images/basic_program.png'
import KidChamps from '../../images/kid_champs.png'
import LittleNinjas from '../../images/little_ninjas.png'

// Custom Styled Components
const InnerContainer = styled(Segment)`
  width: 70% !important;
  margin: 0 15% !important;
`

/**
 * Display the available programs and optional enrollment
 * @author Brennick Langston
 * @version 0.0.1
 */
class Programs extends Component {

  render() {
    return (
      <Container fluid>
        <InnerContainer>
          <Header as='h2' textAlign='center'>
            <Header.Content style={{ color: '#E1142F', marginTop: '2rem' }} >
              Martial Arts Develops Concentration, Confidence, and Self Discipline
            </Header.Content>
          </Header>
          <p style={{ textAlign: 'justify', width: '70%', margin: '0 15%' }}>
            Bobby Lawrence Karate has a program for everyone and every age. Our
            programs help develop physical fitness and weight-loss, discipline
            and self control and safety and self-defense. Click here to view our
            &nbsp;<Link to='/calendar'>Weekly Class Schedule</Link>.
          </p>
          <Message>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={6}>
                  <Image
                    src={BasicProgram}
                    size='large' />
                </Grid.Column>
                <Grid.Column width={10}>
                  <Message.Header>
                    Basic Training
                  </Message.Header>
                  <p>
                    Our basic karate program teaches the fundamentals of karate
                    training.  We emphasize fitness through power karate techniques
                    involving kicking and punching combinations. We also teach basic,
                    practical self defense techniques. In addition, we teach 36
                    valuable life skills and principles for successful living
                    involving topics ranging from respect and discipline to good
                    health habits. The purpose of the basic program is to help prepare
                    students to commit to earning their black belt through our Black
                    Belt Training program.
                  </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={10}>
                  <Message.Header>
                    Black Belt Training
                  </Message.Header>
                  <p>
                    Our Black Belt Training program contains everything that is in our
                    Basic program, as well as all the techniques needed to become a
                    black belt. They will also learn safe sparring drills that help in
                    building confidence.  Students also learn how to use the traditional
                    karate weapons, nun-chucks, bo-staff, and short sticks.
                    This skill work increases hand eye coordination, that contributes
                    to greater mental focus.
                  </p>
                  <p>
                    These students also learn board breaking which teaches them how to
                    apply the principles of power behind a strike or kick. The
                    students in this class train for an hour per class instead of the
                    standard 45 minutes for the basic program.
                  </p>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Image
                    src={BlackBeltTraining}
                    size='large' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column width={6}>
                  <Image
                    src={LittleNinjas}
                    size='large' />
                </Grid.Column>
                <Grid.Column width={10}>
                  <Message.Header>
                    Little Ninjas
                  </Message.Header>
                  <p>
                    Little Ninja program - This program is for children ages 4 to 5.
                    This class is designed to introduce young children to the discipline
                    of classical karate. We also focus on teaching them basic listening
                    and motor skills, knowing how to control one's body, be safe, and
                    politeness to others.
                    </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={10}>
                  <Message.Header>
                    Kid Champs
                  </Message.Header>
                  <p>
                    Kid Champs are for kids ages 6 -7 years old. This class continues
                    to build on the skills learned in the Little Ninjas class but adds
                    complexity by combining the basic skills. We also begin teaching
                    age appropriate self-defense skills.
                  </p>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Image
                    src={KidChamps}
                    size='large' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={3}>
                  <Image
                    src={Juniors}
                    size='small' />
                </Grid.Column>
                <Grid.Column width={13}>
                  <Message.Header>
                    Junior Class
                  </Message.Header>
                  <p>
                    Our Junior Program is for ages 8-12. This class teaches elementary
                    aged children confidence, competence, and character while continuing
                    to develop classical karate skills. Confidence comes from being in
                    good physical shape, acquiring useful social skills, and knowing
                    how to be assertive without being aggressive.
                  </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={10}>
                  <Message.Header>
                    Teens/Adults
                  </Message.Header>
                  <p>
                    Our Teen & Adult class ages 13 and up. While in addition to
                    learning classical karate, teens learn how to say "no" to negative
                    peer pressure and how to set and achieve goals. Our Teen and Adult
                    program also teaches fearless fitness, practical self-defense skills,
                    and calming meditations.
                  </p>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Image
                    src={TeenAdult}
                    size='large' />
                  </Grid.Column>
              </Grid.Row>
            </Grid>
          </Message>
        </InnerContainer>
      </Container>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    programs: state.programs,
  }
}

export default connect(mapStateToProps)(Programs)

// {/* <Header as='h2' textAlign='center'>
//   <Header.Content>
//     Interested In A Program
//   </Header.Content>
//   <Header.Subheader>
//     Follow the Steps Below to Become Involved
//   </Header.Subheader>
// </Header>
// <Message>
//   <Message.Header>
//     Registration Steps
//   </Message.Header>
//   <Message.List>
//     <Message.Item>
//       Select an program that interests you.
//     </Message.Item>
//     <Message.Item>
//       Contact the local <Link to='/contact_email'>Sensei</Link> to signup or register your student.
//     </Message.Item>
//     <Message.Item>
//       Create an <Link to='/register'>Online Account</Link> so you'll have access to program information.
//     </Message.Item>
//     <Message.Item>
//       Participate during one of our <Link to='/calendar'>scheduled classes</Link>.
//     </Message.Item>
//   </Message.List>
// </Message> */}
