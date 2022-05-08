import { Box, Button, Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const GetCandidates = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { id } = location.state || ''
  const [offer, setOffer] = useState({})
  const [users, setUsers] = useState({})

  useEffect(() => {
    if (id != '') {
      dispatch({ type: 'loading', isLoading: true })

      axios.get('http://localhost:5000/offers/get/' + id).then((res) => {
        setOffer(res.data)
        console.log('====================================')
        console.log(res.data)
        console.log('====================================')
        dispatch({ type: 'loading', isLoading: false })
      })
    }
  }, [])

  var t = [55, 6, 99, 88, 2, 23, 120]

  console.log(
    t.sort((a, b) => {
      return a - b
    }),
  )

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>GetCandidates offer : {offer.title} </div>
      <div>Candidates</div>
      <p style={{ marginTop: 50 }}>
        {offer.candidates &&
          offer.candidates
            .sort((a, b) => {
              return b.exam.result - a.exam.result
            })
            .map((item) => {
              return (
                <p>
                  {item.user.firstName +
                    '  ' +
                    item.user.lastName +
                    '  ==> ' +
                    item.exam.result +
                    '%'}
                  <Button
                    disabled={item.exam.result < offer.min}
                    variant="outlined"
                    sx={{ mx: 5 }}
                  >
                    Contact
                  </Button>
                </p>
              )
            })}
      </p>
    </Stack>
  )
}

export default GetCandidates
