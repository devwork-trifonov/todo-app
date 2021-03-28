import React from "react"
import { connect } from "react-redux"
import { AccountDropdown } from "../components/account/AccountDropdown"
import { logoutUser } from "../actions/user"

function AccountDropdownContainer({ userData, logoutUser }) {
  return <AccountDropdown user={userData} logout={logoutUser} />
}

function mapStateToProps(state) {
  const { userData } = state.user

  return { userData }
}

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDropdownContainer)
