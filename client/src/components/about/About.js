import React, { Component } from 'react'
import { Container, Segment, Header } from 'semantic-ui-react'

class About extends Component {

  render = () => {
    return (
      <Container as={Segment} style={{ padding: '6rem 0' }}>
        <Container text textAlign='justified'>
          <Header as='h2' textAlign='center'>
            Bobby Lawrence Karate
          </Header>
          <p>
            Master Lawrence started his karate training 40 years ago in 1970, in Las
            Vegas Nevada. In 1972, upon graduation from high school, Master Lawrence
            moved to San Bernardino California to attend college and further his
            karate training. After graduating with a degree in History and Physical
            Education and a California Teaching Certificate in 1977, he moved his
            young family to Utah to pursue a Master’s Degree in History.
            Master Lawrence continued his studies of karate, kung fu and a little
            judo. He also coached football, basketball, and track. After two years,
            he returned to BYU to study law. After graduation and passing the
            Utah State Bar, Master Lawrence sought business experience which he
            obtained while working for a couple of large corporations in Utah County.
            Between 1988 and 1993, Master Lawrence served as the Martial Arts
            Director in the PE department at BYU.
          </p>
          <p>
            After teaching in the public schools for a number of years and working
            in the corporate world, his wife Charlene, decided to turn Master
            Lawrence’s hobby into a business. The Bobby Lawrence Karate system was
            created by combining several martial arts, including Shotokan Karate,
            Kenpo Karate, American Sport Karate, Kwon Shu Karate, Arnis, Dan Zan Ryu
            Ju Jitsu, Brazilian Jiu Jitsu, and Folk Style Wrestling. But Charlene
            observed that from a parents’ perspective what was really valuable about
            karate training wasn’t just the kicking and punching and sparring that
            Master Lawrence enjoyed so much. What was really valuable was the respect
            and discipline inherent in karate training.
          </p>
        </Container>
      </Container>
    )
  }
}

export default About
