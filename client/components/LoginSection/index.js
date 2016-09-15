import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../../actions/auth'
import firebase, { facebookAuthProvider } from '../../constants/firebase'


class LoginSection extends Component {

  facebookLogIn() {
    const { actions } = this.props
    actions.logInAttempt()
    firebase.auth().signInWithPopup(facebookAuthProvider).then((result) => {
      actions.logInSuccess(result.user)
    }).catch((err) => {
      actions.logInFailure()
    })
  }

  render() {
    return (
      <div className='ui raised padded container segment'>
        <div>
          <h1 className='ui header'> Login </h1>
        </div>
        <div className='ui clearing divider'/>
        <button onClick={::this.facebookLogIn} className='ui facebook button'>
          <i className='facebook icon'/>
          Log in with Facebook
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSection)