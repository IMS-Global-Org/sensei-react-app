import styled from 'styled-components'

// Custom Styled Components
const LabelField = styled.div`
  display: inline-block;
  width: ${ props => props.width || 'auto' };
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  padding-right: 0.25rem;
  :after {
    content: ':'
  }
`
// width: ${props => props.width || '5rem' };

export default LabelField
