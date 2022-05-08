import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UpdateProfile from './UpdateProfile'

const Profile = () => {
  const user = useSelector((state) => state.user)
  const [isOpen, setisOpen] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const handleClose = () => {
    setisOpen(false)
  }
  return (
    <Box
      sx={{
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {isOpen && (
        <UpdateProfile
          isOpen={isOpen}
          handleClose={handleClose}
          setIsSubmit={setIsSubmit}
        />
      )}
      <h1>Profile</h1>
      <div>
        FirstName :
        <span style={{ fontWeight: 'bolder' }}> {user.firstName}</span>
      </div>
      <div>
        LastName :<span style={{ fontWeight: 'bolder' }}> {user.lastName}</span>
      </div>
      <div>
        Email :<span style={{ fontWeight: 'bolder' }}> {user.email}</span>
      </div>
      <div>
        Login :<span style={{ fontWeight: 'bolder' }}> {user.login}</span>
      </div>
      <Button
        sx={{ marginTop: 5 }}
        onClick={() => {
          setisOpen(true)
        }}
      >
        Update profile
      </Button>
    </Box>
  )
}

export default Profile
