import React, { Component } from 'react'
import { Container, Segment, Grid, Header, Image } from 'semantic-ui-react'

// Images
import MasterLawrence from '../../images/master_lawrence.png'

class About extends Component {

  render = () => {
    return (
      <Segment as={Container}>
        <Container>
          <Grid style={{ margin: '5rem'}}>
            <Grid.Row columns={2}>
              <Grid.Column width={5}>
                <Image src={MasterLawrence}
                  size='medium'
                  verticalAlign='top'
                  bordered
                  rounded />
                </Grid.Column>
                <Grid.Column width={11}>
                  <Header as='h2' textAlign='center'>
                    Bobby Lawrence Karate (空手)
                  </Header>
                  <p>
                    Bobby Lawrence Karate, sometimes referred to simply as BLK, is a
                    unique eclectic system of karate developed by Master Bobby Lawrence.
                    Bobby Lawrence Karate has been training and instructing students since
                    1991. Headed by Bobby Lawrence and his staff of expert instructors,
                    Bobby Lawrence Karate offers a number of programs for karate instruction
                    at all levels.
                  </p>
                  <Header as='h3' textAlign='center'>
                    BLK CV
                  </Header>
                  <p>
                    BLKCV is a new school that opened in the fall of 2016. This school
                    is directed by Heather Orgill. Heather began her love for physical
                    activity and sports as a young girl. She has participated in organized,
                    competitive sports in volleyball, basketball, softball, and track.
                    She has always had an interest in Martial Arts but the opportunity
                    to participate in this art didn't present itself until 2011. Her
                    oldest daughter expressed an interest in taking a Martial Arts class
                    at the age of 5 but needed a buddy to go with her. So, Heather being
                    the sport fanatic that she is, eagerly volunteered for the job.
                    This was the beginning of  her Martial Arts studies. Heather trained
                    in the style of Tang Soo Do for 5 years in which time she achieved
                    the rank of First Degree Black Belt. Shortly thereafter, she began
                    training with Master Bobby Lawrence, in his eclectic system. During
                    this time she has achieved the rank of Second Degree Black Belt and
                    is continuing her training with Master Lawrence. Heather also has a
                    BS in Cultural Anthropology, fulfilled a service mission in Uruguay
                    for The Church of Jesus Christ of Latter Day Saints. She is also the
                    proud mother of 3 wonderful girls and the grateful wife to a wonderful
                    and supportive husband. Heather loves working with the students and
                    helping them develop their skills, talent and confidence. Nothing is
                    more rewarding than watching someone accomplish the goals they have
                    worked so hard to achieve.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
      </Segment>
    )
  }
}

export default About
