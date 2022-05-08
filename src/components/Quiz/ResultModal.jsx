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

const ResultModal = ({ isOpen, handleClose, finalResult }) => {
  var offer = useSelector((state) => state.offer)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: finalResult >= offer.min ? 'green' : 'red',
    border: '5px solid grey',
    boxShadow: 24,
    p: 4,
  }
  return (
    <Modal
      onClose={handleClose}
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {'min : ' + offer.min + ' %'}
        <br />
        {'your result : ' + finalResult + ' %'}
      </Box>
    </Modal>
  )
}

export default ResultModal
