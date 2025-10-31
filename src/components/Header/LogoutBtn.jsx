import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

// Logout button component to handle user sign-out and Redux state reset
function LogoutBtn() {
  const dispatch = useDispatch()

  // Handles logout by calling Appwrite service and clearing auth state
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn
