import React, { Component } from 'react'
import { List, Icon } from 'semantic-ui-react'
import LabelField from '../helpers/LabelField'
import ListPara from '../helpers/ListPara'
import IconArea from '../helpers/IconArea.js'
import EditPostModal from './EditPostModal'


class ViewPostLinks extends Component {
  defaults = { linkId: '', editor: '' }
  state = { ...this.defaults }

  editLink = ( linkId ) => this.setState({ linkId, editor: 'link' })
  resetEditor = () => this.setState({ ...this.defaults })

  displayLinks = () => {
    const { links } = this.props
    if( links && links.length > 0 ) {
      return links.map( link => (
        <List.Item key={link.id}>
          <IconArea>
            <Icon
              name='edit'
              onClick={()=>this.editLink(link.id)}/>
          </IconArea>
          <br />
          <LabelField bold>Title</LabelField>
          {link.title}
          <List>
            <List.Item>
              <LabelField bold>URL</LabelField>
              {link.url}
            </List.Item>
            <List.Item>
              <LabelField bold>Abbrev.</LabelField>
              {link.abbreviation}
            </List.Item>
            <List.Item>
              <LabelField bold>Desc.</LabelField>
              <ListPara>
                {link.description}
              </ListPara>
            </List.Item>
          </List>
        </List.Item>
      ))
    }
  }

  render = () => {
    const { linkId, editor } = this.state
    return (
      <List divided relaxed>
        { this.displayLinks() }
        <List.Item>
          <IconArea>
            <Icon
              name='plus square outline'
              onClick={()=>this.editLink()} />
          </IconArea>
          { editor &&
            <EditPostModal
              editor={editor}
              id={linkId}
              resetEditor={this.resetEditor} />
          }
        </List.Item>
      </List>
    )
  }
}

export default ViewPostLinks
