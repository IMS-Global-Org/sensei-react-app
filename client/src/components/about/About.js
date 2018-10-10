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
                    Bobby Lawrence Karate
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
                  <p>
                    Master Lawrence started his karate training 40 years ago in 1970,
                    in Las Vegas Nevada. In 1972, upon graduation from high school,
                    Master Lawrence moved to San Bernardino California to attend
                    college and further his karate training. After graduating
                    with a degree in History and Physical Education and a
                    California Teaching Certificate in 1977, he moved his young
                    family to Utah to pursue a Master’s Degree in History. Master
                    Lawrence continued his studies of  karate, kung fu and a little
                    judo. He also coached football, basketball, and track.
                    After two years, he returned to BYU to study law. After graduation
                    and passing the Utah State Bar, Master Lawrence sought business
                    experience which he obtained while working for a couple of large
                    corporations in Utah County. Between 1988 and 1993, Master Lawrence
                    served as the Martial Arts Director in the PE department at BYU.
                  </p>
                  <p>
                    After teaching in the public schools for a number of years and
                    working in the corporate world, his wife Charlene, decided to
                    turn Master Lawrence’s hobby into a business. The Bobby Lawrence
                    Karate system was created by combining several martial arts,
                    including Shotokan Karate, Kenpo Karate, American Sport Karate,
                    Kwon Shu Karate, Arnis, Dan Zan Ryu Ju Jitsu, Brazilian Jiu Jitsu,
                    and Folk Style Wrestling. But Charlene observed that from a
                    parents’ perspective what was really valuable about karate training
                    wasn’t just the kicking and punching and sparring that Master
                    Lawrence enjoyed so much. What was really valuable was the respect
                    and discipline inherent in karate training.
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
