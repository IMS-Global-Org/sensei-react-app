import React from 'react'
import ViewAddresses from './ViewAddresses'

const EditAddresses = ({ addresses, contracteeId }) => (
  <ViewAddresses
    editor
    addresses={addresses}
    contracteeId={contracteeId} />
)

export default EditAddresses
