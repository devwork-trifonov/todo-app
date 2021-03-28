import React, { Suspense } from "react"
import { connect } from "react-redux"

import {
  updatePhoto,
  setPassword,
  resetPasswordMessage,
  deleteProfile,
} from "../actions/user"

window.moment = require("moment")

function App(props) {
  const {
    isFetchingUser,
    updatePhoto,
    isAuthenticate,
    userData,
    password,
    deleteProfile,
  } = props
  const AuthenticateApp = React.lazy(
    () => import("../components/authenticate/AuthenticateApp")
  )
  const UnAuthenticateApp = React.lazy(
    () => import("../components/unauthenticate/UnAuthenticateApp")
  )

  if (isFetchingUser) {
    return <h2>Loading...</h2>
  } else if (!isFetchingUser && isAuthenticate) {
    return (
      <Suspense fallback={<h2>Loading...</h2>}>
        <AuthenticateApp
          user={userData}
          updatePhoto={updatePhoto}
          resetPasswordMessage={props.resetPasswordMessage}
          setPassword={props.setPassword}
          password={password}
          deleteProfile={deleteProfile}
        />
      </Suspense>
    )
  } else if (!isFetchingUser && !isAuthenticate) {
    return (
      <Suspense fallback={<h2>Loading...</h2>}>
        <UnAuthenticateApp />
      </Suspense>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state
  const { isFetchingUser, isAuthenticate, userData, password } = user

  return {
    isFetchingUser,
    isAuthenticate,
    userData,
    password,
  }
}

const mapDispatchToProps = (dispatch) => ({
  updatePhoto: (blob) => dispatch(updatePhoto(blob)),
  setPassword: (data) => dispatch(setPassword(data)),
  resetPasswordMessage: () => dispatch(resetPasswordMessage()),
  deleteProfile: (data) => dispatch(deleteProfile(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
