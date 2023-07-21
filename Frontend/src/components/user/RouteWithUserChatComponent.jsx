import React from 'react'
import { Outlet } from 'react-router-dom'
import UserChatComponent from './UserChatComponent'

const RouteWithUserChatComponent = () => {
  return (
    <>
    <Outlet/>
    <UserChatComponent/>
    </>
  )
}

export default RouteWithUserChatComponent
