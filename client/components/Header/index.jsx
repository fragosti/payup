import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router'

import SimpleDropdown from '../SimpleDropdown'
import * as AuthActions from '../../actions/auth'
import img from '../../../static/img/LogoExport.png'

class Header extends Component {
  render() {
    const { auth, actions, router } = this.props
    return (
      <div className='ui large menu'>
        <div className='ui container'>
          <div className='item'>
            <img className='ui image tiny' alt='logo' src={img} />
          </div>
          <div className='right menu'>
            <SimpleDropdown
              title={auth.auth ?
                auth.user.email :
                <LogInButton />
              }
            >
              {auth.auth && <LogOutItem actions={actions} router={router} />}
            </SimpleDropdown>
          </div>
        </div>
      </div>
    )
  }
}

const LogInButton = () => (
  <Link to='login'><div className='ui primary button'>Login</div></Link>
)


const LogOutItem = (props) => {
  const { router } = props
  const { logOut } = props.actions
  return (
    <a
      className='item'
      onClick={() => {
        router.push('login')
        logOut()
      }}
    >Logout</a>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
