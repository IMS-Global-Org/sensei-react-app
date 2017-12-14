import styled from 'styled-components'

// Custom Styled Components
const LabelField = styled.div`
  display: inline-block;
  width: 5rem;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  :after {
    content: ':'
  }
`

export default LabelField
