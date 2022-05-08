import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Forbidden from '../../Forbidden/Forbidden'
import Sidebar from '../Sidebar/Sidebar'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import '../Sidebar/Sidebar.css'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { withStyles } from '@material-ui/core'
import Modal from 'react-modal/lib/components/Modal'
import Swal from 'sweetalert2'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from '@mui/material'

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

function Dashboard() {
  const [open, setOpen] = React.useState(false)
  const [error, seterror] = React.useState(false)
  const [role, setRole] = React.useState('CANDIDATE')
  const [data, setData] = useState([])
  const [selectedUser, setSelectedUser] = useState({})
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const location = useLocation()
  const user = useSelector((state) => state.user) || {}
  const [users, setUsers] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  var d = []
  var tempUsers = []

  const Delete = () => {
    var cible
    if (Object.keys(selectedUser) != 0) {
      cible = selectedUser
    } else {
      cible = selectedRows
    }

    axios
      .delete('http://localhost:5000/admin/delete', {
        data: {
          cible: cible,
        },
      })
      .then((res) => {
        setShowDeleteModal(false)
        tempUsers = []

        Object.keys(res.data).map((k) => {
          tempUsers.push({
            id: res.data[k]._id + '',
            lastName: res.data[k].lastName,
            firstName: res.data[k].firstName,
            age: res.data[k].role,
            fullName: dateFormat(res.data[k].deletedAt),
          })
        })
        setUsers(tempUsers)
      })
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
    axios.get('http://localhost:5000/admin').then((res) => {
      Object.keys(res.data.users).map((k) => {
        tempUsers.push({
          id: res.data.users[k]._id + '',
          lastName: res.data.users[k].lastName,
          firstName: res.data.users[k].firstName,
          age: res.data.users[k].role,
          fullName: dateFormat(res.data.users[k].deletedAt),
        })
      })
      Object.keys(res.data.stat[0].stat).map((k) => {
        d.push({ name: k, Offers: res.data.stat[0].stat[k] })
      })
      setData(d)
      setUsers(tempUsers)
    })

    return () => {}
  }, [])

  const columns = [
    {
      field: 'firstName',
      headerName: 'First name',
      width: 160,
    },
    { field: 'lastName', headerName: 'Last name', width: 160 },
    {
      field: 'age',
      headerName: 'Role',
      width: 160,
    },

    {
      field: 'fullName',
      headerName: 'Deleted At',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 160,

      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'action',
      width: 350,
      renderCell: (params) => {
        return params.row.fullName == null ? (
          user._id != params.row.id ? (
            user.role != 'SUPER_ADMIN' &&
            params.row.age == 'SUPER_ADMIN' ? null : (
              <div
                style={{
                  width: 350,
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClickOpen()
                    setSelectedUser(params.row)
                  }}
                >
                  Update
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDeleteModal(true)
                    setSelectedUser(params.row)
                  }}
                >
                  Delete
                </button>
              </div>
            )
          ) : null
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
  const handleChange = (event) => {
    setRole(event.target.value || '')
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
      if (['ADMIN', 'HR', 'CANDIDATE', 'SUPER_ADMIN'].includes(role)) {
        axios
          .put('http://localhost:5000/admin/setrole', {
            id: selectedUser.id,
            role: role,
          })
          .then((res) => {
            tempUsers = []
            console.log(res.data)
            Object.keys(res.data).map((k) => {
              tempUsers.push({
                id: res.data[k]._id + '',
                lastName: res.data[k].lastName,
                firstName: res.data[k].firstName,
                age: res.data[k].role,
                fullName: dateFormat(res.data[k].deletedAt),
              })
            })
            setUsers(tempUsers)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        return
      }
    }
  }

  if (location.pathname === '/ADMIN' && user.role !== 'ADMIN')
    return (
      <>
        <Forbidden />
      </>
    )
  return (
    <div>
      <Sidebar />
      <Modal
        isOpen={showDeleteModal}
        className={['Modal', 'Delete'].join(' ')}
        overlayClassName="Overlay"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 'bolder',
            width: 600,
          }}
        >
          Confirm Deleting{' '}
          {Object.keys(selectedUser) == 0
            ? 'selected rows ' + selectedRows.length
            : ' user ' + selectedUser.firstName}
          ?
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 100,
          }}
        >
          <button
            style={{
              background: 'red',
              color: 'white',
              border: 0,
              borderRadius: 5,
              width: 80,
            }}
            onClick={() => {
              Delete()
            }}
          >
            Confirm
          </button>
          <button
            style={{
              background: '#0d6efd',
              color: '#fff',
              border: 0,
              borderRadius: 5,
              width: 80,
            }}
            onClick={() => {
              setShowDeleteModal(false)
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={showUpdateModal}
        className={['Modal', 'Delete'].join(' ')}
        overlayClassName="Overlay"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 'bolder',
          }}
        >
          Select the new role
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 100,
          }}
        >
          <button
            style={{
              background: 'red',
              color: 'white',
              border: 0,
              borderRadius: 5,
              width: 80,
            }}
          >
            Confirm
          </button>
          <button
            style={{
              background: '#0d6efd',
              color: '#fff',
              border: 0,
              borderRadius: 5,
              width: 80,
            }}
            onClick={() => {
              setShowUpdateModal(false)
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Role</InputLabel>
              <Select
                native
                selected={role}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                <option value={'CANDIDATE'} selected>
                  Candidate
                </option>
                <option value={'HR'}>HR</option>
                <option value={'ADMIN'}>Admin</option>
                {user.role === 'SUPER_ADMIN' && (
                  <option value={'SUPER_ADMIN'}>Super Admin</option>
                )}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <div className="home-section">
        Dashboard
        <LineChart
          width={window.innerWidth - 100}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="Offers" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="8 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
        <div>
          Users
          {selectedRows.length != 0 && (
            <div>
              <button
                style={{
                  background: '#f00',
                  color: '#fff',
                  border: 0,
                  borderRadius: 10,
                  width: 380,
                  height: 30,
                  fontSize: 18,
                  fontWeight: 'bolder',
                }}
                onClick={() => {
                  setSelectedUser({})
                  if (error) {
                    Swal.fire({
                      title: 'Error!',
                      text: 'Correct the errors first',
                      icon: 'error',
                      confirmButtonText: 'Ok',
                    })
                    return false
                  }
                  setShowDeleteModal(true)
                }}
              >
                Delete "{selectedRows.length}" selected rows
              </button>
            </div>
          )}
          <div
            style={{
              width: '100%',
              display: 'flex',
              height: users.length * 50 + 120,
              maxHeight: 375,
            }}
          >
            <StyledDataGrid
              hideFooterSelectedRowCount
              rowHeight={50}
              rows={users}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(itm) => {
                var selected = []
                itm.map((i) => {
                  var u = users.find((e) => e.id == i)
                  if (u.age === 'SUPER_ADMIN' && user.role != 'SUPER_ADMIN') {
                    Swal.fire({
                      title: 'Error!',
                      text: 'You are not allowed to select a super admin',
                      icon: 'error',
                      confirmButtonText: 'Ok',
                    })
                    seterror(true)

                    return false
                  }

                  if (u.id == user._id) {
                    Swal.fire({
                      title: 'Error!',
                      text: 'You can not select your self',
                      icon: 'error',
                      confirmButtonText: 'Ok',
                    })
                    seterror(true)

                    return false
                  }
                  seterror(false)
                  selected.push(u)
                })
                setSelectedRows(selected)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Dashboard }
