import React, { useState } from 'react'
import './Sidebar.css'
function Sidebar() {
  const [toggle, setToggle] = useState(false)
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
            <a href="/">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Home</span>
            </a>
            <span className="tooltip">Home</span>
          </li>
          <li>
            <a href="/RH">
              <i className="bx bx-user"></i>
              <span className="links_name">User</span>
            </a>
            <span className="tooltip">User</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-chat"></i>
              <span className="links_name">Messages</span>
            </a>
            <span className="tooltip">Messages</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Analytics</span>
            </a>
            <span className="tooltip">Analytics</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-folder"></i>
              <span className="links_name">File Manager</span>
            </a>
            <span className="tooltip">Files</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-cart-alt"></i>
              <span className="links_name">Order</span>
            </a>
            <span className="tooltip">Order</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-heart"></i>
              <span className="links_name">Saved</span>
            </a>
            <span className="tooltip">Saved</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </a>
            <span className="tooltip">Setting</span>
          </li>
          <li className="profile">
            <div className="profile-details">
              <img src="profile.jpg" alt="profileImg" />
              <div className="name_job">
                <div className="name">Prem Shahi</div>
                <div className="job">{'Admin'}</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
