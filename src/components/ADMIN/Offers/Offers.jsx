import { Alert, Button, Link, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import '../Sidebar/Sidebar.css'
import { withStyles } from '@material-ui/core'

const StyledDataGrid = withStyles({
  root: {
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
    },
    '& .MuiDataGrid-cell': {
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
    },
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important',
    },
  },
})(DataGrid)

const Offers = () => {
  const [offers, setOffers] = useState([])
  const state = useSelector((state) => state)
  const [isOpen, setisOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [Rows, setRows] = useState([])
  const [FilteredRows, setFilteredRows] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClose = () => {
    setisOpen(false)
  }
  const width = 150
  const columns = [
    { field: 'title', headerName: 'Title', width: width },
    {
      field: 'type',
      headerName: 'Type',
      width: width,
    },
    {
      field: 'state',
      headerName: 'State',
      width: width,
    },
    {
      field: 'nbCandidates',
      headerName: 'Number of Candidates',

      width: width,
      renderCell: (params) => {
        return (
          <div style={{ textAlign: 'center' }}>{params.row.nbCandidates}</div>
        )
      },
    },

    {
      field: 'deletedAt',
      headerName: 'Deleted At',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: width,
    },

    {
      field: 'action',
      width: width + 100,
      renderCell: (params) => {
        return params.row.deletedAt == null ? (
          <div
            style={{
              width: 350,
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            {params.row.state === 'SENT' && (
              <>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/checkoffer/' + params.row.id)
                  }}
                >
                  Answer
                </Button>
              </>
            )}
            <Button
              color="error"
              variant="contained"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div
            className="ADMIN"
            style={{
              width: 350,
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            Deleted
          </div>
        )
      },
    },
  ]
  useEffect(() => {
    axios.get('http://localhost:5000/admin/offers').then((res) => {
      setOffers(res.data)
      console.log(res.data)
      setFilteredRows(res.data)
    })
    return () => {}
  }, [])

  const handleSearch = (searchInput) => {
    setSearch(searchInput)
    if (searchInput) {
      console.log('search')
      setFilteredRows(
        offers.filter((offer) => {
          return offer.title.includes(searchInput)
        }),
      )
    } else {
      setFilteredRows(state.offers)
    }
  }
  const dateFormat = (date) => {
    if (date == null) return
    return (
      new Date(date).getFullYear() +
      '/' +
      (new Date(date).getMonth() + 1) +
      '/' +
      new Date(date).getDate() +
      '   ' +
      new Date(date).getHours() +
      ':' +
      new Date(date).getMinutes() +
      ':' +
      new Date(date).getSeconds()
    )
  }

  useEffect(() => {
    var tempRows = []
    FilteredRows.map((item) => {
      tempRows.push({
        id: item._id + '',
        title: item.title,
        type: item.type,
        state: item.state,
        nbCandidates: item.candidates.length,
        nbSucceful: item.candidates.filter((obj) => obj.exam.result >= item.min)
          .length,
        deletedAt: dateFormat(item.deletedAt),
      })
    })
    setRows(tempRows)
  }, [FilteredRows])
  return (
    <div>
      <Sidebar />
      <div className="home-section" style={{ paddingTop: '50px' }}>
        Offers : {offers.length}
        <div>
          <div
            style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'flex-end',
              padding: '30px 100px',
            }}
          >
            <TextField
              variant="outlined"
              label="Search"
              value={search}
              onChange={(e) => {
                handleSearch(e.target.value)
              }}
            />
          </div>

          {FilteredRows.length > 0 ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                height: Rows.length * 50 + 120,
                maxHeight: 375,
                padding: '0 100px',
              }}
            >
              <StyledDataGrid
                rowHeight={50}
                rows={Rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                hideFooterSelectedRowCount
              />
            </div>
          ) : (
            <Alert
              severity="error"
              variant="outlined"
              sx={{
                marginY: '150px',
                justifyContent: 'center',
                width: '500px',
                marginX: '50%',
                transform: 'translate(-50%,0)',
                fontSize: '18px',
                fontWeight: 'bolder',
              }}
            >
              No offers found
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default Offers
