import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Sidebar.css'
function Sidebar() {
  const [toggle, setToggle] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  return (
    <>
      <div className={toggle ? 'sidebar open' : 'sidebar'}>
        <div className="logo-details">
          <img
            alt=""
            src={require('../../../images/logo_final.png')}
            style={{ height: 50 }}
          />
          <div className="logo_name">Recrute</div>
          <i
            className="bx bx-menu"
            id="btn"
            onClick={() => {
              setToggle(!toggle)
            }}
          ></i>
        </div>
        <ul className="nav-list">
          <li>
            <a
              href="/"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 15px ',
              }}
            >
              <i className="bx bx-grid-alt"></i>
              <span
                className="links_name"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 50,
                }}
              >
                Home
              </span>
            </a>
            <span className="tooltip">Home</span>
          </li>

          <li>
            <a
              href="/admin/offers"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 15px ',
              }}
            >
              <i class="bx bx-layer"></i>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 50,
                }}
                className="links_name"
              >
                Offers
              </span>
            </a>
            <span className="tooltip">Manage Offers</span>
          </li>

          <li>
            <a
              href="/hr"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 15px ',
              }}
            >
              <i class="bx bx-chart"></i>
              <span
                className="links_name"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 50,
                }}
              >
                HR
              </span>
            </a>
            <span className="tooltip">HR</span>
          </li>

          <li className="profile">
            <div className="profile-details">
              <div className="name_job">
                <div className="name">
                  {user.lastName + ' ' + user.firstName}
                </div>
                <div className="job">{user.role}</div>
              </div>
            </div>
            <i
              className="bx bx-log-out"
              id="log_out"
              onClick={() => {
                dispatch({
                  type: 'auth',
                  user: {},
                })
                window.location.assign('/')
              }}
            ></i>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
