import {
  Autocomplete,
  Box,
  Checkbox,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '5px solid grey',
  boxShadow: 24,
  p: 4,
}
const UpdateProfile = ({ isOpen, handleClose, setIsSubmit }) => {
  var user = useSelector((state) => state.user)
  const [login, setlogin] = useState(user.login)
  const [email, setemail] = useState(user.email)
  const [lastname, setlastname] = useState(user.lastName)
  const [firstname, setfirstname] = useState(user.firstName)
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmit(true)
    dispatch({ type: 'loading', isLoading: true })
    axios
      .put('http://localhost:5000/users', {
        id: user._id,
        firstName: firstname,
        lastName: lastname,
        email: email,
        login: login,
      })
      .then((res) => {
        dispatch({
          type: 'setUser',
          user: res.data,
        })

        handleClose()
        dispatch({ type: 'loading', isLoading: false })
        setIsSubmit(false)
      })
  }
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack spacing={3} sx={style}>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ my: 2 }}
            fullWidth
            required
            type={'text'}
            value={firstname}
            onChange={(e) => {
              setfirstname(e.target.value)
            }}
            label="First Name"
          />
          <TextField
            sx={{ my: 2 }}
            fullWidth
            required
            type={'text'}
            value={lastname}
            onChange={(e) => {
              setlastname(e.target.value)
            }}
            label="Last Name"
          />
          <TextField
            sx={{ my: 2 }}
            fullWidth
            required
            type={'email'}
            value={email}
            onChange={(e) => {
              setemail(e.target.value)
            }}
            label="Email"
          />
          <TextField
            sx={{ my: 2 }}
            fullWidth
            required
            type={'text'}
            value={login}
            onChange={(e) => {
              setlogin(e.target.value)
            }}
            label="Login"
          />
          <input
            type={'submit'}
            className="button button-large w-100 bg-alt py-2 rounded-1 fw-medium nott ls0 m-0"
            id="login-form-submit"
            name="login-form-submit"
            value="Add"
            style={{ width: 150 }}
          />
        </form>
      </Stack>
    </Modal>
  )
}

export default UpdateProfile
