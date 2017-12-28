import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import CreatePostSteps from './CreatePostSteps'
import PostForm from './PostForm'
import VideoFormMulti from './VideoFormMulti'
import LinkFormMulti from './LinkFormMulti'

class CreatePost extends Component {
  defaults = { step: 1, completedSteps: [] }
  state = { ...this.defaults }

  stepCompleted = ( step ) => {
    const { completedSteps } = this.state
    if( !completedSteps.includes(step) ) {
      this.setState({
        step: step + 1,
        completedSteps: [
          ...completedSteps,
          step,
        ].sort()
      })
    } else {
      this.setState({ step: step + 1 })
    }
  }
  
  resetStepTo = ( step ) => this.setState({ step })

  render = () => {
    const { step, completedSteps } = this.state
    return (
      <Segment>
        <CreatePostSteps
          attached='top'
          step={step}
          completedSteps={completedSteps}
          resetStepTo={this.resetStepTo} />
        <Segment>
          {{
            0: <PostForm stepCompleted={this.stepCompleted} />,
            1: <VideoFormMulti stepCompleted={this.stepCompleted} />,
            2: <LinkFormMulti stepCompleted={this.stepCompleted} />,
          }[step - 1]}
        </Segment>
        <CreatePostSteps
          attached='bottom'
          step={step}
          completedSteps={completedSteps}
          resetStepTo={this.resetStepTo} />
      </Segment>
    )
  }
}

export default CreatePost
