import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import CreatePostSteps from './CreatePostSteps'
import PostForm from './PostForm'
import VideoFormMulti from './VideoFormMulti'
import LinkFormMulti from './LinkFormMulti'
import ViewPost from './ViewPost'

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
            3: <ViewPost
                  postId={this.props.activePosting.id}
                  post={this.props.activePosting} />
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

const mapStateToProps = ( state, props ) => {
  return {
    activePosting: state.tablePostings.activePosting,
  }
}

export default connect(mapStateToProps)(CreatePost)
