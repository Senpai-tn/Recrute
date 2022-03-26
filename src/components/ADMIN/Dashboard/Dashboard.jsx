import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Forbidden from '../../Forbidden/Forbidden'
import Sidebar from '../Sidebar/Sidebar'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import '../Sidebar/Sidebar.css'
import axios from 'axios'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
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

function Dashboard() {
  const [data, setData] = useState([])
  const [users, setUsers] = useState([])
  const location = useLocation()
  const user = useSelector((state) => state.user) || {}
  var d = []
  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },

    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'action',
      width: 350,
      renderCell: (params) => {
        return (
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
                alert('update => ' + params.id)
              }}
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                alert('Delete => ' + params.id)
              }}
            >
              Delete
            </button>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    var tempUsers = []
    axios.get('http://localhost:5000/admin').then((res) => {
      Object.keys(res.data.users).map((k) => {
        console.log(res.data.users[k]._id)
        tempUsers.push({
          id: res.data.users[k]._id + '',
          lastName: res.data.users[k].nom,
          firstName: res.data.users[k].prenom,
          age: res.data.users[k].role,
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

  if (location.pathname === '/ADMIN' && user.role !== 'ADMIN')
    return (
      <>
        <Forbidden />
      </>
    )
  return (
    <div>
      <Sidebar />
      <div className="home-section">
        Dashboard
        <LineChart
          width={window.innerWidth - 78}
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
        <div
          style={{
            width: '100%',
            display: 'flex',
            height: 375,
          }}
        >
          <StyledDataGrid
            rowHeight={50}
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(itm) => {
              var selected = []
              itm.map((i) => {
                selected.push(users.find((e) => e.id == i))
              })

              console.log(selected)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export { Dashboard }
