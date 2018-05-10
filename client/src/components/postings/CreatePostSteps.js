import React, { Component } from 'react'
import { Step, Icon } from 'semantic-ui-react'

class CreatePostSteps extends Component {
  state = { step: '', completedSteps: [] }

  componentDidMount = () => this.loadStep(this.props)
  componentWillReceiveProps = ( props ) => this.loadStep(props)
  loadStep = ( props ) => {
    const { step: currStep, completedSteps } = props
    const { step: prevStep } = this.state
    if( currStep !== prevStep ) {
      this.setState({ step: currStep, completedSteps })
    }
  }

  setStep = ( step ) => {
    const { completedSteps } = this.state
    if( completedSteps.includes(step) || completedSteps.includes( step - 1 ) ) {
      this.setState({ step },
        ()=>this.props.resetStepTo(step)
      )
    }
  }

  render = () => {
    const { step, completedSteps } = this.state
    return (
      <Step.Group>

        <Step
          link
          onClick={()=>this.setStep(1)}
          completed={ completedSteps.includes(1) }
          active={ step === 1 ? true : false }>
          <Icon name='file text outline' />
          <Step.Content>
            <Step.Title>Create the Post</Step.Title>
            <Step.Description>
              Start the post
            </Step.Description>
          </Step.Content>
        </Step>

        <Step
          link
          onClick={()=>this.setStep(2)}
          completed={ completedSteps.includes(2) }
          active={ step === 2 ? true : false }>
          <Icon name='video' />
          <Step.Content>
            <Step.Title>Add Videos</Step.Title>
            <Step.Description>Include videos</Step.Description>
          </Step.Content>
        </Step>

        <Step
          link
          onClick={()=>this.setStep(3)}
          completed={ completedSteps.includes(3) }
          active={ step === 3 ? true : false }>
          <Icon name='file image outline' />
          <Step.Content>
            <Step.Title>Add Photos</Step.Title>
            <Step.Description>Include Photos</Step.Description>
          </Step.Content>
        </Step>

        <Step
          link
          onClick={()=>this.setStep(4)}
          completed={ completedSteps.includes(4) }
          active={ step === 4 ? true : false }>
          <Icon name='linkify' />
          <Step.Content>
            <Step.Title>Add Links</Step.Title>
            <Step.Description>Include links</Step.Description>
          </Step.Content>
        </Step>

      </Step.Group>
    )
  }
}

export default CreatePostSteps
