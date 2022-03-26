import { faTable } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Topbar.css'

function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <span className="logo">Forsty</span>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <FontAwesomeIcon className="icon" icon={faTable} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
