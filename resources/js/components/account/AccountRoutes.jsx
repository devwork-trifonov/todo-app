import React from "react"
import { Route } from "react-router-dom"

import { Profile } from "./profile/Profile"
import { ChangePassword } from "./changePassword/ChangePassword"
import { DeleteProfile } from "./delete/DeleteProfile"
import { UploadPhoto } from "./uploadPhoto/UploadPhoto"

export function AccountRoutes({
  user,
  updatePhoto,
  password,
  setPassword,
  resetPasswordMessage,
  deleteProfile,
}) {
  return (
    <>
      <Route exact path="/account">
        <Profile user={user} />
      </Route>
      <Route exact path="/account/password">
        <ChangePassword
          resetPasswordMessage={resetPasswordMessage}
          password={password}
          setPassword={setPassword}
        />
      </Route>
      <Route exact path="/account/delete">
        <DeleteProfile user={user} deleteProfile={deleteProfile} />
      </Route>
      <Route exact path="/account/avatar">
        <UploadPhoto updatePhoto={updatePhoto} />
      </Route>
    </>
  )
}
