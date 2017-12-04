import React from 'react'
import { List } from 'semantic-ui-react'
import moment from 'moment'
import LabelField from './LabelField'
import { BirthdateFormat } from '../helpers/DateFormats'

const ViewPersonalInfo = ({ contractee }) => {
  const bday = moment(contractee.birthdate).format(BirthdateFormat)
  return (
    <List divided relaxed>
      <List.Item>
        <LabelField>Name</LabelField>
        {`${contractee.last}, ${contractee.first}`}
      </List.Item>
      <List.Item>
        <LabelField>Birthdate</LabelField>
        {bday}
      </List.Item>
    </List>
  )
}

export default ViewPersonalInfo
