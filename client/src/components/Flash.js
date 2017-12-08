import React from 'react';
import { connect } from 'react-redux';
import { clearFlash } from '../actions/flash';
import '../styles/flash.css';
import { Segment, Button } from 'semantic-ui-react';

const fadeFlash = (dispatch) => {
  setTimeout( () => {
    dispatch(clearFlash());
  }, 5000)
}

const Flash = ({ flash, dispatch }) => {
  if(flash.message) {
    return(
      <Segment basic textAlign='center'>
        <Segment
          id='alert'
          className={`alert alert-${flash.msgType}`}
          >
          { flash.message }
          { fadeFlash(dispatch) }
          <Button
            basic
            compact
            icon='close'
            style={{ margin: '0 1rem' }}
            onClick={ () => dispatch(clearFlash()) } />
        </Segment>
      </Segment>
    )
  } else {
    return null;
  }
}

const mapStateToProps = (state) => {
  return { flash: state.flash };
}

export default connect(mapStateToProps)(Flash);
