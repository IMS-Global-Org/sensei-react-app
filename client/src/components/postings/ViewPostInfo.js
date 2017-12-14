import React, { Component } from 'react'
import { List, Icon } from 'semantic-ui-react'
import LabelField from '../helpers/LabelField'
import IconArea from '../helpers/IconArea'
import EditPostModal from './EditPostModal'



class ViewPostInfo extends Component {
  defaults = { editor: '' }
  state = { ...this.defaults }

  editPost = () => this.setState({ editor: 'post' })
  resetEditor = () => this.setState({ ...this.defaults })

  render = () => {
    const { post } = this.props
    const { editor } = this.state
    return (
      <List divided relaxed>
        <List.Item>
          <IconArea>
            <Icon
              name='edit'
              onClick={this.editPost} />
          </IconArea>
          <LabelField bold>Title</LabelField>
          {post.title}
          <br />
          <LabelField bold>Message</LabelField>
          {post.message}
        </List.Item>
        { editor &&
          <EditPostModal
            editor={editor}
            resetEditor={this.resetEditor} />
        }
      </List>
    )
  }
}

export default ViewPostInfo
